from django.contrib import admin
from .models import (
    Usuario, Categoria, Descuento, Producto, ImagenProducto,
    Review, DesingPersonalizado, ProductoPersonalizado,
    Carrito, DetalleCarrito, Pedido, DetalleCompra, Pago
)

admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(Descuento)
admin.site.register(Producto)
admin.site.register(ImagenProducto)
admin.site.register(Review)
admin.site.register(DesingPersonalizado)
admin.site.register(ProductoPersonalizado)
admin.site.register(Carrito)
admin.site.register(DetalleCarrito)
admin.site.register(Pedido)
admin.site.register(DetalleCompra)
admin.site.register(Pago)
