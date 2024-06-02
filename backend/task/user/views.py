from rest_framework import viewsets
from .models import User
from .serializers import (
    UserSerializer,
    UserDetailSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Change the serializer class based on the action
    def get_serializer_class(self):
        if self.action == "retrieve":
            return UserDetailSerializer
        return UserSerializer
