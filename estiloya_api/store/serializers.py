# store/serializers.py
from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Usuario
        fields = "__all__"

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Categoria
        fields = "__all__"

class DescuentoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Descuento
        fields = "__all__"

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.SlugRelatedField(queryset=Categoria.objects.all(), slug_field="nombre")
    descuento = serializers.SlugRelatedField(queryset=Descuento.objects.all(), slug_field="porcentaje")
    estado = serializers.ChoiceField(choices=Producto.ESTADO_CHOICES)
    tipo = serializers.ChoiceField(choices=Producto.TIPO_CHOICES)
    class Meta:
        model  = Producto
        fields = (
            "id",
            "nombre",
            "descripcion",
            "imagen",
            "precio",
            "stock",
            "tipo",
            "categoria",
            "descuento",
            "fecha_creacion",
            "estado",
        )

class ImagenProductoSerializer(serializers.ModelSerializer):
    producto = serializers.SlugRelatedField(queryset=Producto.objects.all(), slug_field="nombre")
    class Meta:
        model  = ImagenProducto
        fields = "__all__"

class CustomDesignSerializer(serializers.ModelSerializer):
    usuario = serializers.SlugRelatedField(queryset=Usuario.objects.all(), slug_field="correo")
    class Meta:
        model  = CustomDesign
        fields = "__all__"

class CustomProductSerializer(serializers.ModelSerializer):
    producto = serializers.SlugRelatedField(queryset=Producto.objects.all(), slug_field="nombre")
    diseño = serializers.PrimaryKeyRelatedField(
        queryset=CustomDesign.objects.filter(estado="aprobado")
    )
    class Meta:
        model  = CustomProduct
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    producto     = serializers.SlugRelatedField(queryset=Producto.objects.all(), slug_field="nombre")
    usuario      = serializers.SlugRelatedField(queryset=Usuario.objects.all(), slug_field="correo")
    class Meta:
        model  = Review
        fields = "__all__"
