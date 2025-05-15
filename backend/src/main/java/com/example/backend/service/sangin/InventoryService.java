package com.example.backend.service.sangin;

import com.example.backend.dao.sangin.InventoryDao;
import com.example.backend.dto.InventoryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryDao inventoryDao;

    public List<InventoryDto> getInventoryByStore(Long storeId) {
        return inventoryDao.findByStoreId(storeId);
    }
}

