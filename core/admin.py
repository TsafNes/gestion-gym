from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .models import CustomUser, Client, Abonnement, RendezVous, Notification, Gestionnaire, specialiste
# Register your models here.

admin.site.register(CustomUser, UserAdmin)


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "is_staff", "is_superuser", "role")
    list_filter = ("role",)
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("role",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("role",)}),
    )

admin.site.unregister(CustomUser)
admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "telephone", "courriel", "nb_heures_restantes")
    search_fields = ("nom", "prenom", "courriel")


@admin.register(Abonnement)
class AbonnementAdmin(admin.ModelAdmin):
    list_display = ("type", "duree", "date_debut", "date_fin")
    list_filter = ("type",)


@admin.register(RendezVous)
class RendezVousAdmin(admin.ModelAdmin):
    list_display = ("client", "specialiste", "date_heure", "duree", "statut")
    list_filter = ("statut", "date_heure")


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("destinataire", "message", "date", "lu")
    list_filter = ("lu",)


@admin.register(Gestionnaire)
class GestionnaireAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "identifiant")


@admin.register(specialiste)
class SpecialisteAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "email", "telephone", "identifiant")
