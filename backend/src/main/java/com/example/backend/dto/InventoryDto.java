package com.example.backend.dto;

import lombok.Data;

@Data
public class InventoryDto {
    private Long inventoryId;     // 재고 ID
    private Long storeId;         // 매장 ID
    private Long materialId;      // 자재 ID
    private String materialName;  // 자재 이름 (JOIN materials)
    private String categoryCode;  // 카테고리 코드 (JOIN materials)
    private String categoryName;  // 카테고리 이름 (JOIN material_category)
    private double quantity;      // 수량
    private String unit;          // 단위 (JOIN materials)
    private String expiredAt;  // 유통기한
    private String createdAt; // 등록일
}


