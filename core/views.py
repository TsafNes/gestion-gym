from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Client, Abonnement, RendezVous, Notification, Gestionnaire, Specialiste
from .serializers import ClientSerializer  # Ajoute les autres au besoin

# VueSet de base (exemple pour Client)
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# ✅ Vue protégée pour récupérer les infos du user connecté
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }
    return Response(data)
