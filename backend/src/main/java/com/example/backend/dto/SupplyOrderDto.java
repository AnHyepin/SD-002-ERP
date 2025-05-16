package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SupplyOrderDto {
    private Long orderId;
    private Long requestId;
    private Long storeId;
    private String storeName;
    private String status;
    private LocalDateTime approvedAt;

    private List<SupplyOrderItemDto> items; // 지시서에 포함된 자재들
}
