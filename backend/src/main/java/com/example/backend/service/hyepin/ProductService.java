package com.example.backend.service.hyepin;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Value("${front.file-dir}")
    private String fileDir;

    @Value("${file.upload-dir}")
    private String uploadPath;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDto getProduct(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductDto createProduct(ProductDto productDto, MultipartFile image) {
        Product product = convertToEntity(productDto);
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImage(imageUrl);
        }
        product.setCreatedAt(LocalDateTime.now());
        return convertToDTO(productRepository.save(product));
    }

    public ProductDto updateProduct(ProductDto productDto, MultipartFile image) {
        Product existingProduct = productRepository.findById(productDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setProductName(productDto.getProductName());
        existingProduct.setProductDesc(productDto.getProductDesc());
        existingProduct.setPrice(productDto.getPrice().intValue());

        if (image != null && !image.isEmpty()) {
            // 기존 이미지 삭제
            if (existingProduct.getImage() != null) {
                deleteImage(existingProduct.getImage());
            }
            // 새 이미지 저장
            String imageUrl = saveImage(image);
            existingProduct.setImage(imageUrl);
        }

        return convertToDTO(productRepository.save(existingProduct));
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 이미지 파일 삭제
        if (product.getImage() != null) {
            deleteImage(product.getImage());
        }

        productRepository.delete(product);
    }

    private String saveImage(MultipartFile file) {
        try {
            // 업로드 디렉토리 생성
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            // 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = UUID.randomUUID().toString() + extension;

            // 파일 저장
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath);

            // 프론트엔드에서 접근 가능한 URL 반환
            return fileDir + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    private void deleteImage(String imageUrl) {
        try {
            String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadPath).resolve(filename);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }

    private ProductDto convertToDTO(Product product) {
        ProductDto dto = new ProductDto();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setProductDesc(product.getProductDesc());
        dto.setPrice(product.getPrice().longValue());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setImage(product.getImage());
        return dto;
    }

    private Product convertToEntity(ProductDto dto) {
        Product product = new Product();
        product.setProductId(dto.getProductId());
        product.setProductName(dto.getProductName());
        product.setProductDesc(dto.getProductDesc());
        product.setPrice(dto.getPrice().intValue());
        product.setImage(dto.getImage());
        return product;
    }
} 