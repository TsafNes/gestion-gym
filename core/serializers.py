from rest_framework import serializers
from .models import Client, RendezVous, Notification

# ✅ Serializer Client
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

# ✅ Serializer RendezVous avec nom du client
class RendezVousSerializer(serializers.ModelSerializer):
    client_nom = serializers.SerializerMethodField()

    class Meta:
        model = RendezVous
        fields = '__all__'  # ou liste explicite si tu préfères
        depth = 0

    def get_client_nom(self, obj):
        return f"{obj.client.prenom} {obj.client.nom}"

# ✅ Serializer Notification avec nom du destinataire
class NotificationSerializer(serializers.ModelSerializer):
    destinataire_nom = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = '__all__'
        depth = 0

    def get_destinataire_nom(self, obj):
        return f"{obj.destinataire.prenom} {obj.destinataire.nom}"
