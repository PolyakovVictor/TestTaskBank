from rest_framework import serializers
from .models import User, Bank


class BankSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]

    def create(self, validated_data):
        user_ids = validated_data.pop("users", [])
        bank = Bank.objects.create(**validated_data)
        bank.users.set(user_ids)
        return bank

    def update(self, instance, validated_data):
        user_ids = validated_data.pop("users", [])
        instance.bank_name = validated_data.get("bank_name", instance.bank_name)
        instance.routing_number = validated_data.get(
            "routing_number", instance.routing_number
        )
        instance.swift_bic = validated_data.get("swift_bic", instance.swift_bic)
        instance.save()

        if user_ids:
            instance.users.set(user_ids)

        return instance


class BankDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic"]


class UserSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Bank.objects.all(),
        required=False,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "password",
            "first_name",
            "last_name",
            "username",
            "email",
            "banks",
        ]

    def update(self, instance, validated_data):
        bank_ids = validated_data.pop("banks", [])
        instance.password = validated_data.get("password", instance.password)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        if bank_ids:
            instance.banks.set(bank_ids)

        return instance


class UserDetailSerializer(serializers.ModelSerializer):
    banks = BankDetailSerializer(
        many=True,
        read_only=True,
        required=False,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "password",
            "first_name",
            "last_name",
            "username",
            "email",
            "banks",
        ]


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "password",
            "first_name",
            "last_name",
            "username",
            "email",
        ]


class DetailedBankSerializer(serializers.ModelSerializer):
    users = SimpleUserSerializer(
        many=True,
        read_only=True,
        required=False,
    )

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]
