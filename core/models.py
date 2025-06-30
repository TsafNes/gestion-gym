from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):
    # Ajoute des champs personnalisés ici si nécessaire
    pass


class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Abonnement(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    type_abonnement = models.CharField(max_length=50)
    date_debut = models.DateField()

    def __str__(self):
        return f"{self.client} - {self.type_abonnement}"
