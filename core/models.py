from django.db import models
from django.contrib.auth.models import AbstractUser

# ----------- UTILISATEUR PERSONNALISÉ -----------
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('gestionnaire', 'Gestionnaire'),
        ('specialiste', 'Spécialiste'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='gestionnaire')

    def __str__(self):
        return f"{self.username} ({self.role})"

# ----------- CLIENT -----------
class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20, blank=True, null=True)
    nb_heures_restantes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

# ----------- ABONNEMENT -----------
class Abonnement(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    type_abonnement = models.CharField(max_length=50)
    date_debut = models.DateField()
    date_fin = models.DateField(blank=True, null=True)
    duree = models.PositiveIntegerField(help_text="Durée en jours", default=30)

    def __str__(self):
        return f"{self.client} - {self.type_abonnement}"

# ----------- RENDEZ-VOUS -----------
class RendezVous(models.Model):
    STATUT_CHOICES = [
        ('prévu', 'Prévu'),
        ('annulé', 'Annulé'),
        ('terminé', 'Terminé'),
    ]

    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField()
    objet = models.CharField(max_length=255, blank=True)
    statut = models.CharField(max_length=50, choices=STATUT_CHOICES, default='prévu')

    def __str__(self):
        return f"{self.client} - {self.date.strftime('%Y-%m-%d %H:%M')}"

# ----------- NOTIFICATION -----------
class Notification(models.Model):
    destinataire = models.ForeignKey(Client, on_delete=models.CASCADE)
    message = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification à {self.destinataire}"

# ----------- GESTIONNAIRE -----------
class Gestionnaire(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

# ----------- SPÉCIALISTE -----------
class Specialiste(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    specialite = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.username
