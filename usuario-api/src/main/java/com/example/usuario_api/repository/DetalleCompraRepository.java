// src/main/java/com/example/usuario_api/repository/DetalleCompraRepository.java
package com.example.usuario_api.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.usuario_api.model.DetalleCompra;

public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Long> {
    List<DetalleCompra> findByPedidoId(Long pedidoId);
}

