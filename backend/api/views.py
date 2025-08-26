from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, viewsets
from .serializers import RegisterSerializer, AnimalSerializer, UserSerializer
from .models import Animal
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.decorators import api_view

@api_view(["GET"])
def get_animals(request):
    data = [
        {"id": 1, "name": "Lion"},
        {"id": 2, "name": "Elephant"}
    ]
    return Response(data)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all().order_by("-created_at")
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)

class AnimalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["create"]:
            return [AllowAny()]
        elif self.action in ["list", "retrieve"]:
            return [IsAdminUser()]
        return super().get_permissions()
