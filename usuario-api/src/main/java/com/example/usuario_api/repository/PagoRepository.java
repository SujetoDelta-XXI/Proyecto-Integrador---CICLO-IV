// src/main/java/com/example/usuario_api/repository/PagoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.usuario_api.model.Pago;

public interface PagoRepository extends JpaRepository<Pago, Long> {}
