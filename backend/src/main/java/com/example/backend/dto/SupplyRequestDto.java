package com.example.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplyRequestDto {
    private Long requestId;
    private Long storeId;
    private String storeName; // optional, 조인해서 보여주면 좋음
    private String status;
    private String requestedAt;
    private List<SupplyRequestItemDto> items;
}
