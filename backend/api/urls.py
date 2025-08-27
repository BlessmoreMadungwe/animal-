from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from .views import RegisterView, AnimalListCreateView, AnimalDetailView, UserViewSet

# Router for UserViewSet (admin-only CRUD)
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Registration (public)
    path('users/register/', RegisterView.as_view(), name='register'),

    # JWT authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Protected animal endpoints
    path('animals/', AnimalListCreateView.as_view(), name='animal_list_create'),
    path('animals/<int:pk>/', AnimalDetailView.as_view(), name='animal_detail'),

    # Router endpoints (user CRUD, admin only)
    path('', include(router.urls)),
]

# Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
