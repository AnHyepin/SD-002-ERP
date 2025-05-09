package com.example.backend.controller.hyepin;

import com.example.backend.dto.MaterialDto;
import com.example.backend.service.hyepin.MaterialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/material")
public class MaterialController {

    private final MaterialService materialService;

    //전체 원재료 조회
    @GetMapping
    public ResponseEntity<List<MaterialDto>> getAllStores() {
        List<MaterialDto> materialList = materialService.getMaterialList();
        log.info("getAllMaterials: " + materialList);
        return ResponseEntity.ok(materialList);
    }

    // 원재료 등록
    @PostMapping
    public ResponseEntity<Integer> saveMaterial(@RequestBody MaterialDto materialDto) {
        int result = materialService.saveMaterial(materialDto);
        return ResponseEntity.ok(result);
    }

    // 원재료 수정
    @PutMapping
    public ResponseEntity<Integer> updateMaterial(@RequestBody MaterialDto materialDto){
        int result = materialService.updateMaterial(materialDto);
        return ResponseEntity.ok(result);
    }

    // 원재료 삭제
    @DeleteMapping("/{materialId}")
    public ResponseEntity<Integer> deleteMaterial(@PathVariable int materialId){
        int result = materialService.deleteMaterial(materialId);
        return ResponseEntity.ok(result);
    }

}
