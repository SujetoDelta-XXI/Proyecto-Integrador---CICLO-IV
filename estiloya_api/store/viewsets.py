# store/viewsets.py
from rest_framework import viewsets
from .models import Usuario, Categoria, Descuento, Producto, ImagenProducto, CustomDesign, CustomProduct, Review
from .serializers import *

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class DescuentoViewSet(viewsets.ModelViewSet):
    queryset = Descuento.objects.all()
    serializer_class = DescuentoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().select_related("categoria", "descuento")
    serializer_class = ProductoSerializer

class ImagenProductoViewSet(viewsets.ModelViewSet):
    queryset = ImagenProducto.objects.all().select_related("producto")
    serializer_class = ImagenProductoSerializer

class CustomDesignViewSet(viewsets.ModelViewSet):
    queryset = CustomDesign.objects.all().select_related("usuario")
    serializer_class = CustomDesignSerializer

class CustomProductViewSet(viewsets.ModelViewSet):
    queryset = CustomProduct.objects.all().select_related("producto", "diseño")
    serializer_class = CustomProductSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().select_related("producto", "usuario")
    serializer_class = ReviewSerializer
