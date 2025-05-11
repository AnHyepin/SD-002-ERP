package com.example.backend.controller.hyepin;

import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductRepository productRepository;

    //전체 제품 조회
    @GetMapping
    public ResponseEntity<List<Product>> getProductList() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    //제품등록

    //제품 수정

    //제품 삭제
}
