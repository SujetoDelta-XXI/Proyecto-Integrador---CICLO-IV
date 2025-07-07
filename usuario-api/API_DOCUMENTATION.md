# Documentación Completa API de Autenticación - EstiloYa

## Descripción General

Esta documentación describe todos los endpoints de autenticación de la aplicación EstiloYa, incluyendo autenticación básica, autenticación de dos factores (2FA), recuperación de contraseña y login con Google.

**IMPORTANTE**: Todos los usuarios DEBEN tener 2FA configurado para poder hacer login. Si un usuario no tiene correo alternativo configurado, será redirigido a configurarlo.

## Base URL

```
http://192.168.18.2:8080/api/
```

## Endpoints de Autenticación

### 1. Registro de Usuario

**Endpoint:** `POST /api/auth/register`

**Descripción:** Registra un nuevo usuario en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Carlos",
  "apellidos": "Asparrin",
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "contraseña": "miContraseña123",
  "telefono": "+51987654321"
}
```

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  },
  "requiere2FA": false,
  "jwt": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Error (400/409):**
```json
{
  "success": false,
  "message": "El correo ya está registrado"
}
```

---

### 2. Login Tradicional

**Endpoint:** `POST /api/auth/login`

**Descripción:** Autentica un usuario con correo y contraseña.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "contraseña": "miContraseña123"
}
```

**Response Exitosa (200) - Sin 2FA Configurado (Debe Configurar):**
```json
{
  "success": true,
  "message": "Debe configurar correo alternativo para 2FA",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  },
  "requiere2FA": true,
  "metodos": {
    "correo": true,
    "sms": true
  },
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "correoAlternativo": null,
  "tiene2FAConfigurado": false,
  "jwt": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Exitosa (200) - Con 2FA Configurado:**
```json
{
  "success": true,
  "message": "Se requiere verificación 2FA",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  },
  "requiere2FA": true,
  "metodos": {
    "correo": true,
    "sms": true
  },
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "correoAlternativo": "asparrincarlos715@gmail.com",
  "tiene2FAConfigurado": true,
  "jwt": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

### 3. Login con Google

**Endpoint:** `POST /api/auth/login-google`

**Descripción:** Autentica un usuario usando Google OAuth.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Login con Google exitoso",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  },
  "requiere2FA": false,
  "jwt": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Endpoints de Autenticación de Dos Factores (2FA)

### 4. Enviar Código 2FA

**Endpoint:** `POST /api/auth/2fa/send-code`

**Descripción:** Envía un código de verificación por correo o SMS.

**Headers:**
```
Authorization: Bearer {token_temporal}
Content-Type: application/json
```

**Query Parameters:**
```
metodo=correo  // o "sms"
```

**Request Body:** (vacío)

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Código enviado exitosamente"
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 5. Verificar Código 2FA

**Endpoint:** `POST /api/auth/login/verify-2fa`

**Descripción:** Verifica el código 2FA y completa la autenticación.

**Headers:**
```
Authorization: Bearer {token_temporal}
Content-Type: application/json
```

**Query Parameters:**
```
code=123456
```

**Request Body:** (vacío)

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Verificación 2FA exitosa",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  },
  "jwt": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Código inválido"
}
```

---

### 6. Registrar Correo Alternativo

**Endpoint:** `POST /api/auth/2fa/register-email`

**Descripción:** Registra un correo alternativo para 2FA.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
```
alternativo=asparrincarlos715@gmail.com
```

**Request Body:** (vacío)

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Correo alternativo registrado exitosamente"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Correo inválido"
}
```

---

## Endpoints de Recuperación de Contraseña

### 7. Solicitar Recuperación de Contraseña

**Endpoint:** `POST /api/auth/forgot-password`

**Descripción:** Envía un correo con instrucciones para restablecer la contraseña.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "correo": "carlos.asparrin@tecsup.edu.pe"
}
```

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Se ha enviado un correo con instrucciones para restablecer tu contraseña"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "No se encontró una cuenta con ese correo"
}
```

---

### 8. Restablecer Contraseña

**Endpoint:** `POST /api/auth/reset-password`

**Descripción:** Restablece la contraseña usando el token enviado por correo.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "token": "reset_token_123456",
  "contraseña": "nuevaContraseña123"
}
```

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Contraseña restablecida exitosamente"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

## Endpoints de Perfil de Usuario

### 9. Obtener Perfil

**Endpoint:** `GET /api/usuario/perfil`

**Descripción:** Obtiene la información del perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:** (vacío)

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  }
}
```

---

### 10. Actualizar Perfil

**Endpoint:** `PUT /api/usuario/perfil`

**Descripción:** Actualiza la información del perfil del usuario.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Carlos",
  "apellidos": "Asparrin",
  "telefono": "+51987654321"
}
```

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Perfil actualizado exitosamente",
  "user": {
    "id": 7,
    "nombre": "Carlos",
    "apellidos": "Asparrin",
    "correo": "carlos.asparrin@tecsup.edu.pe",
    "telefono": "+51987654321",
    "rol": "USER",
    "fechaRegistro": "2025-07-06T19:00:00"
  }
}
```

---

### 11. Actualizar Datos del Usuario (Endpoint /me)

**Endpoint:** `PUT /api/me`

**Descripción:** Actualiza datos específicos del usuario.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Carlos",
  "apellidos": "Asparrin",
  "telefono": "+51987654321"
}
```

**Response Exitosa (200):**
```json
{
  "id": 7,
  "nombre": "Carlos",
  "apellidos": "Asparrin",
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "telefono": "+51987654321",
  "rol": "USER",
  "fechaRegistro": "2025-07-06T19:00:00"
}
```

---

## Endpoint de Prueba

### 12. Probar Conexión

**Endpoint:** `GET /api/auth/test-connection`

**Descripción:** Prueba la conectividad con el servidor.

**Headers:** (ninguno requerido)

**Request Body:** (vacío)

**Response Exitosa (200):**
```json
{
  "success": true,
  "message": "Conexión exitosa",
  "timestamp": "2025-07-06T19:00:00"
}
```

---

## Modelos de Datos

### Usuario
```json
{
  "id": 7,
  "nombre": "Carlos",
  "apellidos": "Asparrin",
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "telefono": "+51987654321",
  "rol": "USER",
  "fechaRegistro": "2025-07-06T19:00:00"
}
```

### Token JWT
Los tokens JWT tienen la siguiente estructura:
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiY29ycmVvIjoiY2FybG9zLmFzcGFycmluQHRlY3N1cC5lZHUucGUiLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzUxODQ3MTkzLCJleHAiOjE3NTE4NTA3OTN9.N_PxQSR-SDxWVcyWPHhnOq7Tfeft0BeflrAeoqw9kQ4
```

**Payload del JWT:**
```json
{
  "sub": "7",
  "correo": "carlos.asparrin@tecsup.edu.pe",
  "rol": "USER",
  "iat": 1751847193,
  "exp": 1751848793
}
```

---

## Códigos de Estado HTTP

- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Error en la solicitud (datos inválidos)
- **401**: No autorizado (token inválido o expirado)
- **403**: Prohibido (sin permisos)
- **404**: Recurso no encontrado
- **409**: Conflicto (recurso ya existe)
- **500**: Error interno del servidor

---

## Manejo de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

Para errores de validación:
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": {
    "correo": "El correo es requerido",
    "contraseña": "La contraseña debe tener al menos 8 caracteres"
  }
}
```

---

## Flujo de Autenticación Completo

### 1. Login Sin 2FA Configurado (NUEVO USUARIO)
```
1. POST /api/auth/login
2. Response: requiere2FA = true, tiene2FAConfigurado = false
3. Usuario debe configurar correo alternativo
4. POST /api/auth/2fa/register-email (con token temporal + correo alternativo)
5. POST /api/auth/2fa/send-code (con token temporal)
6. Usuario ingresa código
7. POST /api/auth/login/verify-2fa (con token temporal + código)
8. Response: token final, usuario autenticado
```

### 2. Login Con 2FA Configurado (USUARIO EXISTENTE)
```
1. POST /api/auth/login
2. Response: requiere2FA = true, tiene2FAConfigurado = true
3. POST /api/auth/2fa/send-code (con token temporal)
4. Usuario ingresa código
5. POST /api/auth/login/verify-2fa (con token temporal + código)
6. Response: token final, usuario autenticado
```

### 3. Recuperación de Contraseña
```
1. POST /api/auth/forgot-password
2. Usuario recibe correo con token
3. POST /api/auth/reset-password (con token + nueva contraseña)
4. Contraseña actualizada
```

---

## Notas Importantes

1. **Tokens JWT**: Tienen un tiempo de vida limitado (1 hora por defecto)
2. **Tokens Temporales**: Se usan solo para el flujo de 2FA
3. **CORS**: El servidor está configurado para permitir peticiones desde cualquier origen
4. **Validación**: Todos los campos son validados tanto en el cliente como en el servidor
5. **Seguridad**: Las contraseñas se hashean antes de almacenarse
6. **Logs**: El servidor registra todas las operaciones de autenticación para auditoría
7. **2FA OBLIGATORIO**: Todos los usuarios DEBEN tener 2FA configurado para hacer login

---

## Configuración del Cliente

### Headers Requeridos
Para endpoints protegidos:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### Manejo de Tokens
- **Token Principal**: Se usa para todas las operaciones autenticadas
- **Token Temporal**: Solo se usa durante el flujo de 2FA
- **Expiración**: Los tokens expirados deben ser manejados automáticamente

### Interceptor de Autenticación
El cliente Android incluye un interceptor que:
- Agrega automáticamente el header Authorization
- Maneja tokens expirados
- Redirige al login cuando es necesario
- Permite endpoints públicos sin autenticación

### Lógica de Navegación en la App Móvil

**Para usuarios SIN 2FA configurado (NUEVOS USUARIOS):**
1. Login exitoso → Mostrar pantalla de configuración de correo alternativo
2. Usuario ingresa correo alternativo → POST /api/auth/2fa/register-email
3. Enviar código de verificación → POST /api/auth/2fa/send-code
4. Usuario ingresa código → POST /api/auth/login/verify-2fa
5. Verificación exitosa → Navegar a Home

**Para usuarios CON 2FA configurado (USUARIOS EXISTENTES):**
1. Login exitoso → Mostrar pantalla de verificación 2FA
2. Enviar código de verificación → POST /api/auth/2fa/send-code
3. Usuario ingresa código → POST /api/auth/login/verify-2fa
4. Verificación exitosa → Navegar a Home

---

## Estado de Implementación

✅ **Completado:**
- Registro de usuario
- Login tradicional (2FA obligatorio)
- Login con Google
- Autenticación 2FA
- Recuperación de contraseña
- Endpoints de perfil
- Configuración CORS
- Manejo de errores estandarizado
- Lógica corregida para 2FA obligatorio

✅ **Configuración:**
- CORS configurado para permitir cualquier origen
- Seguridad configurada para todos los endpoints
- DTOs actualizados para respuestas estandarizadas
- Validaciones implementadas
- Información de métodos disponibles en todas las respuestas
- 2FA obligatorio para todos los usuarios

La API está lista para ser utilizada por la aplicación móvil EstiloYa. 