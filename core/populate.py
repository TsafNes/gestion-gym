from core.models import Client, Abonnement
from django.contrib.auth import get_user_model

# Supprimer les données existantes pour éviter les doublons
Client.objects.all().delete()
Abonnement.objects.all().delete()

# Création de quelques clients
clients = [
    Client.objects.create(nom="Jean", prenom="Dupont", email="jean.dupont@email.com"),
    Client.objects.create(nom="Alice", prenom="Martin", email="alice.martin@email.com"),
    Client.objects.create(nom="Karim", prenom="Benzema", email="karim.benzema@email.com")
]

# Création de quelques abonnements
abonnements = [
    Abonnement.objects.create(client=clients[0], type_abonnement="Mensuel", date_debut="2025-07-01"),
    Abonnement.objects.create(client=clients[1], type_abonnement="Annuel", date_debut="2025-06-15"),
    Abonnement.objects.create(client=clients[2], type_abonnement="Hebdomadaire", date_debut="2025-06-29")
]

# Création d’un utilisateur spécialiste (si le modèle existe)
User = get_user_model()
if not User.objects.filter(username='specialiste1').exists():
    User.objects.create_user(username='specialiste1', password='password1234', email='specialiste1@gym.com', is_staff=True)

print("✔ Données de démonstration insérées avec succès.")
