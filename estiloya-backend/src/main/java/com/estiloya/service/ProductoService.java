package com.estiloya.service;

import com.estiloya.dto.ProductoDTO;
import com.estiloya.model.Producto;
import com.estiloya.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<ProductoDTO> buscarPorNombrePrecioYCategoria(String nombre, BigDecimal precioMax, String categoria) {
        return productoRepository.buscarPorNombrePrecioYCategoria(nombre, precioMax, categoria)
                .stream().map(p -> new ProductoDTO(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getImagen(),
                        p.getPrecio(),
                        p.getStock(),
                        p.getCategoria() != null ? p.getCategoria().getNombre() : null,
                        p.getMarca() != null ? p.getMarca().getNombre() : null,
                        p.getDescuento() != null ? p.getDescuento().getPorcentaje() : null
                )).collect(Collectors.toList());
    }
}
