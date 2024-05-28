from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Bank


class UserSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Bank.objects.all(), required=False
    )

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "banks"]


class BankSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]
