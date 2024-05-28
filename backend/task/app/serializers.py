from rest_framework import serializers
from .models import User, Bank


class UserSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Bank.objects.all(), required=False
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


class BankSerializer(serializers.ModelSerializer):
    users = UserSerializer(
        many=True,
        read_only=True,
        required=False,
    )
    user_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        write_only=True,
        source="users",
        required=False,
    )

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users", "user_ids"]

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
