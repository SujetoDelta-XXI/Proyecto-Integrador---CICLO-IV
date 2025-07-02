// src/main/java/com/example/usuario_api/controller/PaymentController.java
package com.example.usuario_api.controller;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:5173") // cambia si es necesario
public class PaymentController {

    @PostMapping("/crear-sesion")
    public Map<String, String> crearSesionPago(@RequestBody List<Map<String, Object>> productos) throws Exception {
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        for (Map<String, Object> prod : productos) {
            String nombre = (String) prod.get("nombre");
            Long precio = ((Number) prod.get("precio")).longValue(); // en centavos
            Integer cantidad = (Integer) prod.get("cantidad");

            SessionCreateParams.LineItem item = SessionCreateParams.LineItem.builder()
                .setQuantity(Long.valueOf(cantidad))
                .setPriceData(
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("pen")
                        .setUnitAmount(precio * 100) // en centavos
                        .setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(nombre)
                                .build()
                        )
                        .build()
                )
                .build();

            lineItems.add(item);
        }

        SessionCreateParams params = SessionCreateParams.builder()
            .addAllLineItem(lineItems)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:5173/pago-exitoso") // redirección
            .setCancelUrl("http://localhost:5173/pago-cancelado") // redirección
            .build();

        Session session = Session.create(params);
        Map<String, String> response = new HashMap<>();
        response.put("url", session.getUrl());
        return response;
    }
}
