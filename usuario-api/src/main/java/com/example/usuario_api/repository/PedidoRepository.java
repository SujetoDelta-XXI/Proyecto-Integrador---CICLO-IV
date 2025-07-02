// src/main/java/com/example/usuario_api/repository/PedidoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.usuario_api.model.Pedido;
import java.util.Optional;
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
    Optional<Pedido> findByStripePaymentId(String stripePaymentId);

}
