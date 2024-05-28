from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Bank
from .serializers import UserSerializer, BankSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.users.exists():
            return Response(
                {"error": "Bank cannot be deleted as it has associated users."},
                status=400,
            )
        return super().destroy(request, *args, **kwargs)
