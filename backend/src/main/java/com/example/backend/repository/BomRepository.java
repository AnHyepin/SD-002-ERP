package com.example.backend.repository;

import com.example.backend.entity.Bom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BomRepository extends JpaRepository<Bom, Long> {
    List<Bom> findByProductId(Long productId);
}