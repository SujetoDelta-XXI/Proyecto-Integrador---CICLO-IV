package com.estiloya.repository;

import com.estiloya.model.Descuento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescuentoRepository extends JpaRepository<Descuento, Long> {
}
