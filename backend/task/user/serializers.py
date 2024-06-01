from rest_framework import serializers
from .models import User
from bank.models import Bank


class UserSerializer(serializers.ModelSerializer):
    banks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Bank.objects.all(), required=False
    )

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "banks"]


class UserDetailSerializer(serializers.ModelSerializer):
    banks = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "banks"]

    def get_banks(self, obj):
        from bank.serializers import BankSerializer

        banks = obj.banks.all()
        return BankSerializer(banks, many=True).data
