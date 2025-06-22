// src/main/java/com/example/usuario_api/repository/PasswordResetTokenRepository.java
package com.example.usuario_api.repository;

import com.example.usuario_api.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken,Long> {
  Optional<PasswordResetToken> findByToken(String token);
}
