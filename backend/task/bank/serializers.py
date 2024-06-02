from rest_framework import serializers
from .models import Bank
from user.models import User


class BankSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]


class BankDetailSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]

    def get_users(self, obj):
        from user.serializers import UserSerializer

        users = obj.users.all()
        return UserSerializer(users, many=True).data
