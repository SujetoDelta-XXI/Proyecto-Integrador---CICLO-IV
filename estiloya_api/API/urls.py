from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'descuentos', DescuentoViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'imagenes-producto', ImagenProductoViewSet)
router.register(r'review', ReviewViewSet)
router.register(r'desing-personalizados', DesingPersonalizadoViewSet)
router.register(r'productos-personalizados', ProductoPersonalizadoViewSet)
router.register(r'carritos', CarritoViewSet)
router.register(r'detalle-carrito', DetalleCarritoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'detalle-compra', DetalleCompraViewSet)
router.register(r'pagos', PagoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
