from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, Bank
from .serializers import UserSerializer, UserDetailSerializer, BankSerializer, DetailedBankSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserDetailSerializer
        return UserSerializer


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return DetailedBankSerializer
        return BankSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.users.exists():
            return Response(
                {"error": "Cannot delete bank with associated users."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)
