package com.example.usuario_api.repository;

import com.example.usuario_api.model.CustomDesign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomDesignRepository extends JpaRepository<CustomDesign, Long> {
    
    // Find designs by user ID and status
    List<CustomDesign> findByUsuarioIdAndEstado(Long usuarioId, String estado);
    
    // Find all designs by user ID
    List<CustomDesign> findByUsuarioId(Long usuarioId);
    
    // Find designs by status only
    List<CustomDesign> findByEstado(String estado);
    
    // Find designs by user ID ordered by creation date (newest first)
    @Query("SELECT cd FROM CustomDesign cd WHERE cd.usuario.id = :usuarioId ORDER BY cd.fecha_creacion DESC")
    List<CustomDesign> findByUsuarioIdOrderByFechaCreacionDesc(@Param("usuarioId") Long usuarioId);
    
    // Find designs by user ID and status ordered by creation date (newest first)
    @Query("SELECT cd FROM CustomDesign cd WHERE cd.usuario.id = :usuarioId AND cd.estado = :estado ORDER BY cd.fecha_creacion DESC")
    List<CustomDesign> findByUsuarioIdAndEstadoOrderByFechaCreacionDesc(@Param("usuarioId") Long usuarioId, @Param("estado") String estado);
} 