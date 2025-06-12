from rest_framework import serializers
from core.models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'          # → solo lo que quieras exponer

class DescuentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descuento
        fields = ["id", "porcentaje"]

# ----------  Producto  ----------

class ProductoSerializer(serializers.ModelSerializer):
    # 1)  Campos solo-lectura con el objeto completo
    categoria  = CategoriaSerializer(read_only=True)
    descuento  = DescuentoSerializer(read_only=True)

    # 2)  Campos solo-escritura que aceptan el ID
    categoria_id = serializers.PrimaryKeyRelatedField(
        source="categoria", queryset=Categoria.objects.all(),
        write_only=True
    )
    descuento_id = serializers.PrimaryKeyRelatedField(
        source="descuento", queryset=Descuento.objects.all(),
        allow_null=True, write_only=True
    )

    class Meta:
        model  = Producto
        #            ↓↓↓ se exponen los “nombres oficiales”
        fields = [
            "id", "nombre", "descripcion", "imagen",
            "precio", "stock", "tipo",
            "categoria", "categoria_id",      # objeto y id
            "descuento", "descuento_id",      # objeto y id
            "fecha_creacion", "estado",
        ]

class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class DesingPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesingPersonalizado
        fields = '__all__'

class ProductoPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoPersonalizado
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = '__all__'

class DetalleCarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCarrito
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class DetalleCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCompra
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'
