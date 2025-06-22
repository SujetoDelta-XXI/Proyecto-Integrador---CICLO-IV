// src/main/java/com/example/usuario_api/repository/DetalleCarritoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.usuario_api.model.DetalleCarrito;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, Long> {
    List<DetalleCarrito> findByUsuarioId(Long usuarioId);
}
