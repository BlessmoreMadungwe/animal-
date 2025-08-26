from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Animal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("username", "email", "password")  # ✅ include email

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data.get("email", "")
        )
        user.set_password(validated_data["password"])  # ✅ hashes password
        user.save()
        return user

    

class AnimalSerializer(serializers.ModelSerializer):
    reported_by = serializers.CharField(source='reported_by.username', read_only=True)

    class Meta:
        model = Animal
        fields = ['id', 'name', 'reported_by', 'created_at']