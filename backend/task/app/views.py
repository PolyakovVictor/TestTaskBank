from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError
from .models import Bank
from .serializers import BankSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def perform_destroy(self, instance):
        if instance.users.exists():
            raise ValidationError(
                "Cannot delete this bank because it has associated users."
            )
        super().perform_destroy(instance)
