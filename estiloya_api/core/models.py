from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    fecha_registro = models.DateField(null=True, blank=True)
    correo_auth = models.EmailField(null=True, blank=True)
    tiene_2fa = models.IntegerField(default=0)

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)

class Descuento(models.Model):
    porcentaje = models.IntegerField()

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    imagen = models.TextField(null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    tipo = models.CharField(max_length=50)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    descuento = models.ForeignKey(Descuento, on_delete=models.SET_NULL, null=True)
    fecha_creacion = models.DateField()
    estado = models.CharField(max_length=20, default='Activo')

class ImagenProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    url_imagen = models.TextField()

class Review(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    valoracion = models.IntegerField(default=0)
    comentario = models.TextField(null=True, blank=True)
    fecha_reseña = models.DateField(null=True)
    
    class Meta:
        unique_together = ('producto', 'usuario')

class DesingPersonalizado(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    imagen_url = models.TextField(null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    fecha_creacion = models.DateField()
    estado = models.CharField(max_length=20, default='Pendiente')

class ProductoPersonalizado(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    diseño = models.ForeignKey(DesingPersonalizado, on_delete=models.CASCADE)
    nombre_personalizado = models.CharField(max_length=100)
    precio_final = models.DecimalField(max_digits=10, decimal_places=2)

class Carrito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creacion = models.DateField()

class DetalleCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True)
    producto_personalizado = models.ForeignKey(ProductoPersonalizado, on_delete=models.SET_NULL, null=True, blank=True)
    cantidad = models.IntegerField()

class Pedido(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_pedido = models.DateField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, default='Pendiente')
    direccion_envio = models.TextField()
    telefono = models.CharField(max_length=9)

class DetalleCompra(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True)
    producto_personalizado = models.ForeignKey(ProductoPersonalizado, on_delete=models.SET_NULL, null=True, blank=True)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

class Pago(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    fecha_pago = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50)
    estado_pago = models.CharField(max_length=20, default='Pendiente')
    id_transaccion_externo = models.CharField(max_length=100)
