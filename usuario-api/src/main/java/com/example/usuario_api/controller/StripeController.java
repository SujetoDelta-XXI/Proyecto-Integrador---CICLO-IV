// src/main/java/com/example/usuario_api/controller/StripeController.java
package com.example.usuario_api.controller;

import com.example.usuario_api.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*")
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    // 1️⃣ Crear intento de pago y registrar Pedido con estado "Pendiente"
   @PostMapping("/crear-intento")
public Map<String, Object> crearIntento(@RequestBody Map<String, String> datosEnvio, Principal principal) throws StripeException {
    Long userId = Long.valueOf(principal.getName());
    String direccion = datosEnvio.get("direccion");
    String telefono = datosEnvio.get("telefono");
    return stripeService.crearPagoIntent(userId, direccion, telefono);
}


    // 2️⃣ Confirmar pago exitoso → Actualiza Pedido y registra Pago
    @PostMapping("/confirmar")
public void confirmarPago(
    @RequestParam("paymentIntentId") String paymentIntentId,
    Principal principal
) throws StripeException {
    Long userId = Long.parseLong(principal.getName());
    stripeService.confirmarPago(paymentIntentId, userId);
}

}
