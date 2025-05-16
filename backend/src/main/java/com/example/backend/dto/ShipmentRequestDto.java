package com.example.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ShipmentRequestDto {
    private List<ShipmentItemDto> items;
}
