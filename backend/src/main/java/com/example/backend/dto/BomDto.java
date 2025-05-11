package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BomDto {

    private Long bomId;
    private Long productId;
    private String productName;
    private Long materialId;
    private String materialName;
    private Double quantity;
    private String unit;
    private String createdAt;
    private String category;
    private String categoryName;
}
