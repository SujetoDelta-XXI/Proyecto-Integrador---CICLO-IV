# store/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.hashers import make_password

class Usuario(models.Model):
    ROL_CHOICES = [
        ("USER", "User"),
        ("ADMIN", "Admin"),
    ]
    nombre         = models.CharField(max_length=100)
    apellidos      = models.CharField(max_length=100)
    correo         = models.EmailField(unique=True)
    contraseña     = models.CharField(max_length=128)
    telefono       = models.CharField(max_length=20, blank=True, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    correo_auth    = models.EmailField(blank=True, null=True)
    tiene_2fa      = models.PositiveSmallIntegerField(choices=[(0, "Disabled"), (1, "Enabled")], default=0)
    rol            = models.CharField(max_length=5, choices=ROL_CHOICES, default="USER")

    class Meta:
        db_table = "usuarios"

    def save(self, *args, **kwargs):
        # Si la contraseña no parece ya hasheada (pbkdf2_… u otro), la hasheamos:
        if self.contraseña and not self.contraseña.startswith("pbkdf2_"):
            self.contraseña = make_password(self.contraseña)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} {self.apellidos} ({self.rol})"

class Categoria(models.Model):
    nombre      = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "categorias"

    def __str__(self):
        return self.nombre

class Descuento(models.Model):
    porcentaje = models.PositiveIntegerField()

    class Meta:
        db_table = "descuentos"

    def __str__(self):
        return f"{self.porcentaje} %"

class Producto(models.Model):
    TIPO_CHOICES = [
        ("Polo", "Polo"),
        ("Polera", "Polera"),
    ]
    ESTADO_CHOICES = [
        ("Disponible", "Disponible"),
        ("Agotado", "Agotado"),
        ("Preventa", "Preventa"),
    ]
    nombre         = models.CharField(max_length=100)
    descripcion    = models.TextField(blank=True, null=True)
    imagen         = models.TextField(blank=True, null=True)
    precio         = models.DecimalField(max_digits=10, decimal_places=2)
    stock          = models.IntegerField(blank=True, null=True)
    tipo           = models.CharField(max_length=50, blank=True, choices=TIPO_CHOICES)
    categoria      = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name="productos")
    descuento      = models.ForeignKey(Descuento, on_delete=models.SET_NULL, null=True, related_name="productos")
    fecha_creacion = models.DateField(auto_now_add=True)
    estado         = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="Disponible")

    class Meta:
        db_table = "productos"

    def __str__(self):
        return self.nombre

class ImagenProducto(models.Model):
    producto  = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="imagenes")
    url_imagen = models.TextField()

    class Meta:
        db_table = "imagenes_producto"

    def __str__(self):
        return f"{self.id}"

class CustomDesign(models.Model):
    ESTADO_CHOICES = [
        ("aprobado", "aprobado"),
        ("denegado", "denegado"),
        ("pendiente", "pendiente"),
    ]
    usuario        = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="custom_designs")
    url_imagen     = models.TextField()
    descripcion    = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateField(auto_now_add=True)
    estado         = models.CharField(max_length=20, default="Pending")

    class Meta:
        db_table = "custom_designs"

    def __str__(self):
        return f"{self.id}"

class CustomProduct(models.Model):
    producto          = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="custom_products")
    diseño            = models.ForeignKey(CustomDesign, on_delete=models.CASCADE, related_name="custom_products")
    nombre_personalizado = models.CharField(max_length=100)
    precio_final      = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "custom_products"

    def __str__(self):
        return self.nombre_personalizado

class Review(models.Model):
    producto     = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="reseñas")
    usuario      = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="reseñas")
    valoracion   = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=1
    )
    comentario   = models.TextField(blank=True, null=True)
    fecha_reseña = models.DateField(auto_now_add=True)

    class Meta:
        db_table        = "reviews"
        unique_together = ("producto", "usuario")

    def __str__(self):
        return f"{self.producto} – {self.usuario} ({self.valoracion})"
