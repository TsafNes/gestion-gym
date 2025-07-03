# core/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ClientViewSet, GestionnaireViewSet, SpecialisteViewSet, AbonnementViewSet, NotificationViewSet, RendezVousViewSet

router = DefaultRouter()
router.register('clients', ClientViewSet)
router.register('gestionnaires', GestionnaireViewSet)
router.register('specialistes', SpecialisteViewSet)
router.register('abonnements', AbonnementViewSet)
router.register('notifications', NotificationViewSet)
router.register('rendezvous', RendezVousViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
