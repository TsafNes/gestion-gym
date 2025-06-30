from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Client, Abonnement, RendezVous, Notification, Gestionnaire, Specialiste


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

admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "telephone", "email", "nb_heures_restantes")
    search_fields = ("nom", "prenom", "email")


@admin.register(Abonnement)
class AbonnementAdmin(admin.ModelAdmin):
    list_display = ("client", "type_abonnement", "duree", "date_debut", "date_fin")
    list_filter = ("type_abonnement",)


@admin.register(RendezVous)
class RendezVousAdmin(admin.ModelAdmin):
    list_display = ("client", "date", "objet", "statut")
    list_filter = ("statut",)


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("destinataire", "message", "date_envoi", "lu")
    list_filter = ("lu",)


@admin.register(Gestionnaire)
class GestionnaireAdmin(admin.ModelAdmin):
    list_display = ("user",)


@admin.register(Specialiste)
class SpecialisteAdmin(admin.ModelAdmin):
    list_display = ("user", "specialite")
