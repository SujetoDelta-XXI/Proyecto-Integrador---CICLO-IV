package com.estiloya.service;

import com.estiloya.model.User;
import com.estiloya.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registrarUsuario(User user) {
        user.setFechaRegistro(LocalDate.now());
        if (user.getTipoUsuario() == null) {
            user.setTipoUsuario("cliente");
        }
        return userRepository.save(user);
    }

    public Optional<User> buscarPorCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }
}
