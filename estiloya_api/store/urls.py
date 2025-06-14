# store/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .viewsets import (
    UsuarioViewSet,
    CategoriaViewSet,
    DescuentoViewSet,
    ProductoViewSet,
    ImagenProductoViewSet,
    CustomDesignViewSet,
    CustomProductViewSet,
    ReviewViewSet,
)

router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet)
router.register(r"categorias", CategoriaViewSet)
router.register(r"descuentos", DescuentoViewSet)
router.register(r"productos", ProductoViewSet)
router.register(r"imagenes-producto", ImagenProductoViewSet)
router.register(r"custom-designs", CustomDesignViewSet)
router.register(r"custom-products", CustomProductViewSet)
router.register(r"reviews", ReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
