from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet  # ajoute les autres ViewSets plus tard

router = DefaultRouter()
router.register(r'clients', ClientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
