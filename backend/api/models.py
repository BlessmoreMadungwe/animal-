from django.db import models
from django.contrib.auth.models import User

class Animal(models.Model):
    name = models.CharField(max_length=120)
    species = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='animal_images/', blank=True, null=True)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
