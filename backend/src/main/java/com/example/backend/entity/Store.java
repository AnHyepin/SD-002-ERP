package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_store", uniqueConstraints = {
    @UniqueConstraint(columnNames = "store_code")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name", nullable = false, length = 100)
    private String storeName;

    @Column(name = "store_code", nullable = false, length = 20, unique = true)
    private String storeCode;

    @Column(name = "location", length = 255)
    private String location;

    @Column(name = "contact", length = 50)
    private String contact;

    @Column(name = "manager_name", length = 100)
    private String managerName;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
} 