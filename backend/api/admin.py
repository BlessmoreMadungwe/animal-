from django.contrib import admin
from .models import Animal

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ("name", "species", "reported_by", "created_at")
    search_fields = ("name", "species", "reported_by__username")
    list_filter = ("species", "created_at")
