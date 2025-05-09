package com.example.backend.dto;

import lombok.Data;

@Data
public class MaterialDto {
    private String materialId;
    private String materialName;
    private String unit;
    private String unitPrice;
    private String createdAt;
    private String category;
    private String categoryName;
}
