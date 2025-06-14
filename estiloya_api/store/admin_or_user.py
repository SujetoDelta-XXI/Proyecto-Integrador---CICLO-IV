from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User as AuthUser
from .models import Usuario

@receiver(pre_save, sender=Usuario)
def track_role_change(sender, instance, **kwargs):
    # guarda el rol anterior para comparar en post_save
    if instance.pk:
        old = sender.objects.get(pk=instance.pk)
        instance._old_rol = old.rol
    else:
        instance._old_rol = None

@receiver(post_save, sender=Usuario)
def sync_django_admin(sender, instance, created, **kwargs):
    # si es ADMIN y antes no lo era, o es nuevo ADMIN, lo creamos/actualizamos
    if instance.rol == "ADMIN":
        auth_user, _ = AuthUser.objects.get_or_create(
            username=instance.correo,
            defaults={
                "first_name": instance.nombre,
                "last_name": instance.apellidos,
                "email": instance.correo,
            }
        )
        auth_user.is_staff = True
        auth_user.is_superuser = True
        auth_user.set_password(instance.contraseña)
        auth_user.save()
    # si cambió de ADMIN a USER, lo borramos
    elif instance._old_rol == "ADMIN" and instance.rol == "USER":
        AuthUser.objects.filter(username=instance.correo).delete()
