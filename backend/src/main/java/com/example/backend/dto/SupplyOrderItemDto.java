package com.example.backend.dto;

import lombok.Data;

@Data
public class SupplyOrderItemDto {
    private Long materialId;
    private String materialName;
    private Double quantity;
    private String unit;
}
