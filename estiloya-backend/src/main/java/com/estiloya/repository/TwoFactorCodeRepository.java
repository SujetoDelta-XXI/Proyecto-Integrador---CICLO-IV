package com.estiloya.repository;

import com.estiloya.model.TwoFactorCode;
import com.estiloya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TwoFactorCodeRepository extends JpaRepository<TwoFactorCode, Long> {
    Optional<TwoFactorCode> findByUserAndCode(User user, String code);
    void deleteByUser(User user);
}