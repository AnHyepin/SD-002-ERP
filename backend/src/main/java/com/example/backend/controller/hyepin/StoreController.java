package com.example.backend.controller.hyepin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.GubnDto;
import com.example.backend.service.hyepin.StoreService;
import com.example.backend.dto.StoreDto;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    //전체 매장 조회
    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStores() {
        List<StoreDto> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    // 매장 코드 생성
    @PostMapping("/code/generate")
    public ResponseEntity<String> generateStoreCode(@RequestParam("regionCode") String regionCode) {
        try {
            String storeCode = storeService.generateStoreCode(regionCode);
            return ResponseEntity.ok(storeCode);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 지역별 매장 조회
    @GetMapping("/regions")
    public ResponseEntity<List<StoreDto>> getRegionCodes(@RequestParam("regionCode") String regionCode) {
        List<StoreDto> regionCodes = storeService.getStoreListByRegion(regionCode);
        return ResponseEntity.ok(regionCodes);
    }

    //지역코드, 이름으로 조회
    @GetMapping("/name")
    public ResponseEntity<List<StoreDto>> getRegionCodeList(@RequestParam("storeName") String storeName) {
        List<StoreDto> regionList = storeService.getStoreListByName(storeName);
        return ResponseEntity.ok(regionList);
    }


}