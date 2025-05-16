package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ShipmentDto {
    private Long shipmentId;
    private Long orderId;
    private Long storeId;
    private String storeName;

    private Long materialId;
    private String materialName;
    private Double quantity;
    private String unit;

    private LocalDateTime shippedAt;
}