package com.example.backend.dao.sangin;

import com.example.backend.dto.InventoryDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InventoryDao {
    List<InventoryDto> findByStoreId(Long storeId);
}
