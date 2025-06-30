from django.db import models
from django.contrib.auth.models import AbstractUser

# Modèle utilisateur personnalisé
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('gestionnaire', 'Gestionnaire'),
        ('specialiste', 'Spécialiste'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)


# Modèle Client
class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20, blank=True, null=True)
    nb_heures_restantes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.prenom} {self.nom}"


# Modèle Abonnement
class Abonnement(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    type_abonnement = models.CharField(max_length=50)
    date_debut = models.DateField()
    date_fin = models.DateField(blank=True, null=True)
    duree = models.PositiveIntegerField(help_text="Durée en jours", default=30)

    def __str__(self):
        return f"{self.client} - {self.type_abonnement}"


# Modèle RendezVous
class RendezVous(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField()
    objet = models.CharField(max_length=255, blank=True)
    statut = models.CharField(max_length=50, choices=[('prévu', 'Prévu'), ('annulé', 'Annulé'), ('terminé', 'Terminé')], default='prévu')

    def __str__(self):
        return f"{self.client} - {self.date.strftime('%Y-%m-%d %H:%M')}"


# Modèle Notification
class Notification(models.Model):
    destinataire = models.ForeignKey(Client, on_delete=models.CASCADE)
    message = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification à {self.destinataire}"


# Modèle Gestionnaire
class Gestionnaire(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


# Modèle Spécialiste
class Specialiste(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    specialite = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.username
