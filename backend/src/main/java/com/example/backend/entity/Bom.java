package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_bom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bom_id")
    private Long bomId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "material_id", nullable = false)
    private Long materialId;

    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @Column(name = "unit", length = 20)
    private String unit;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Transient
    private String productName;

    @Transient
    private String materialName;
}
