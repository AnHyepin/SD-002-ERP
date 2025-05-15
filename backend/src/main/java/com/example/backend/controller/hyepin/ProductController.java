package com.example.backend.controller.hyepin;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.hyepin.FileService;
import com.example.backend.service.hyepin.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;
    private final FileService fileService;

    //전체 제품 조회
    @GetMapping
    public ResponseEntity<List<Product>> getProductList() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    //제품 한개 조회
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    //제품 등록
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productDesc") String productDesc,
            @RequestParam("price") Long price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(productName);
        productDto.setProductDesc(productDesc);
        productDto.setPrice(price);
        return ResponseEntity.ok(productService.createProduct(productDto, image));
    }

    //제품 수정
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long id,
            @RequestParam("productName") String productName,
            @RequestParam("productDesc") String productDesc,
            @RequestParam("price") Long price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ProductDto productDto = new ProductDto();
        productDto.setProductId(id);
        productDto.setProductName(productName);
        productDto.setProductDesc(productDesc);
        productDto.setPrice(price);
        return ResponseEntity.ok(productService.updateProduct(productDto, image));
    }

    //제품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}

