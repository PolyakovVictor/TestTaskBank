from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Bank
from .serializers import (
    BankSerializer,
    BankDetailSerializer,
)


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BankDetailSerializer
        return BankSerializer

    # Overriding the 'destroy' method
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.users.exists():
            return Response(
                {"error": "Cannot delete bank with associated users."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)
