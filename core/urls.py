from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, RendezVousViewSet, NotificationViewSet, user_info  # Ajoute d'autres ViewSets ici

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'rendezvous', RendezVousViewSet)  # doit exister
router.register(r'notifications', NotificationViewSet)  # doit exister

urlpatterns = [
    path('', include(router.urls)),
    path('me/', user_info),  # ✅ Endpoint sécurisé pour obtenir les infos du user connecté
]
