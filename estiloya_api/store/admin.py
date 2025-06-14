# store/admin.py
from django.contrib import admin
from .models import (
    Usuario, Categoria, Descuento, Producto,
    ImagenProducto, CustomDesign, CustomProduct, Review
)

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display       = ("nombre", "apellidos", "correo", "rol", "tiene_2fa", "fecha_registro")
    list_filter        = ("rol", "tiene_2fa")
    search_fields      = ("nombre", "apellidos", "correo")
    readonly_fields    = ("fecha_registro",)

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display  = ("nombre",)
    search_fields = ("nombre",)

@admin.register(Descuento)
class DescuentoAdmin(admin.ModelAdmin):
    list_display  = ("porcentaje",)
    search_fields = ("porcentaje",)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display        = ("nombre", "categoria", "descuento", "precio", "stock", "estado", "tipo")
    list_filter         = ("estado", "categoria", "descuento")
    search_fields       = ("nombre", "tipo")
    autocomplete_fields = ("categoria", "descuento")

    readonly_fields = ("fecha_creacion",)

    fields = (
        "nombre",
        "descripcion",
        "imagen",
        "precio",
        "stock",
        "tipo",
        "categoria",
        "descuento",
        "estado",
        "fecha_creacion",
    )


@admin.register(ImagenProducto)
class ImagenProductoAdmin(admin.ModelAdmin):
    list_display         = ("producto", "url_imagen")
    autocomplete_fields  = ("producto",)

@admin.register(CustomDesign)
class CustomDesignAdmin(admin.ModelAdmin):
    list_display         = ("id", "usuario", "estado", "fecha_creacion")
    list_filter          = ("estado",)
    autocomplete_fields  = ("usuario",)
    search_fields        = ("usuario__correo",)

@admin.register(CustomProduct)
class CustomProductAdmin(admin.ModelAdmin):
    list_display         = ("nombre_personalizado", "producto", "diseño", "precio_final")
    autocomplete_fields  = ("producto", "diseño")

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display         = ("producto", "usuario", "valoracion", "fecha_reseña")
    list_filter          = ("valoracion",)
    search_fields        = ("producto__nombre", "usuario__correo")
    autocomplete_fields  = ("producto", "usuario")
