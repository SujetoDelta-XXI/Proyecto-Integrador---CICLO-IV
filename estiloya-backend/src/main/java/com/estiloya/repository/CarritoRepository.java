package com.estiloya.repository;

import com.estiloya.model.Carrito;
import com.estiloya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    Optional<Carrito> findByUsuario(User usuario);
}
