package com.example.backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductDto {

    private Long productId;
    private String productName;
    private String productDesc;
    private Long price;
    private LocalDateTime createdAt;
    private String image;

}
