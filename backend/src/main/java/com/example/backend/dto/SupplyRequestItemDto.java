package com.example.backend.dto;

import lombok.Data;

@Data
public class SupplyRequestItemDto {
    private Long materialId;
    private String materialName;
    private double quantity;
    private String unit;
}
