package com.example.backend.dao.sangin;

import com.example.backend.dto.InventoryDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InventoryDao {
    List<InventoryDto> findByStoreId(Long storeId);
    void decreaseInventory(
            @Param("storeId") Long storeId,
            @Param("materialId") Long materialId,
            @Param("quantity") Double quantity
    );

    void increaseInventory(
            @Param("storeId") Long storeId,
            @Param("materialId") Long materialId,
            @Param("quantity") Double quantity
    );
}
