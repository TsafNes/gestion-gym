from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientViewSet,
    RendezVousViewSet,
    NotificationViewSet,
    user_info,
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'rendezvous', RendezVousViewSet)        # ✅ Ajouté
router.register(r'notifications', NotificationViewSet)   # ✅ Ajouté

urlpatterns = [
    path('', include(router.urls)),
    path('me/', user_info),
]
