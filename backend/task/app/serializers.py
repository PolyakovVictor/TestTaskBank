from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Bank


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email"]


class BankSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Bank
        fields = ["id", "bank_name", "routing_number", "swift_bic", "users"]
