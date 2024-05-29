from rest_framework import serializers
from .models import User, Bank


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic"]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email"]


class BankDetailSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]


class UserDetailSerializer(serializers.ModelSerializer):
    banks = BankSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "banks"]
