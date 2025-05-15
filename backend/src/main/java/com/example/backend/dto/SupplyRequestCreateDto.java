package com.example.backend.dto;

import lombok.Data;

@Data
public class SupplyRequestCreateDto {
    private Long storeId;
    private Long materialId;
    private double quantity;

    private Long requestId;
}
