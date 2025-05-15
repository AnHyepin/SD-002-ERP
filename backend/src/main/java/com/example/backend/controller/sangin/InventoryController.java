package com.example.backend.controller.sangin;

import com.example.backend.dto.InventoryDto;
import com.example.backend.service.sangin.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/store")
    public List<InventoryDto> getInventoryByStore(@RequestParam Long storeId) {
        return inventoryService.getInventoryByStore(storeId);
    }
}
