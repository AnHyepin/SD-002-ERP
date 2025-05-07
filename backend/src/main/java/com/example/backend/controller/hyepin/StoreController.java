package com.example.backend.controller.hyepin;

import java.util.List;

import com.example.backend.entity.Store;
import com.example.backend.repository.StoreRepository;
import com.example.backend.service.hyepin.GubnService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.GubnDto;
import com.example.backend.service.hyepin.StoreService;
import com.example.backend.dto.StoreDto;

@RestController
@Slf4j
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @Autowired
    private StoreRepository storeRepository;

    //전체 매장 조회
    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStores() {
        List<StoreDto> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    // 매장 코드 생성
    @PostMapping("/code/generate/{regionCode}")
    public ResponseEntity<String> generateStoreCode(@PathVariable String regionCode) {
        try {
            String storeCode = storeService.generateStoreCode(regionCode);
            return ResponseEntity.ok(storeCode);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 지역별 매장 조회
    @GetMapping("/regions/{regionCode}")
    public ResponseEntity<List<StoreDto>> getRegionCodes(@PathVariable String regionCode) {
        List<StoreDto> regionCodes = storeService.getStoreListByRegion(regionCode);
        return ResponseEntity.ok(regionCodes);
    }

    //지역코드, 이름으로 조회
    @GetMapping("/name/{storeName}")
    public ResponseEntity<List<StoreDto>> getRegionCodeList(@PathVariable String storeName) {
        List<StoreDto> regionList = storeService.getStoreListByName(storeName);
        return ResponseEntity.ok(regionList);
    }

    // 매장 등록
    @PostMapping
    public ResponseEntity<StoreDto> createStore(@RequestBody  StoreDto storeDto) {
        try {
            StoreDto createdStore = storeService.createStore(storeDto);
            return ResponseEntity.ok(createdStore);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 매장 수정
    @PutMapping
    public ResponseEntity<Store> updateStore(@RequestBody Store store) {
        log.info("storeDto: {}", store);
        try {
            Store updatedStore = storeRepository.save(store);
            return ResponseEntity.ok(updatedStore);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //매장 삭제
    @DeleteMapping("/{storeId}")
    public ResponseEntity<Integer> deleteStore(@PathVariable int storeId) {
        int result = storeService.deleteStore(storeId);
        return ResponseEntity.ok(result);
    }
}