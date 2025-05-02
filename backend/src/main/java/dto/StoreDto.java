package dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreDto {
    private Long storeId;
    private String storeName;
    private String storeCode;
    private String location;
    private String contact;
    private String managerName;
    private LocalDateTime createdAt;
}
