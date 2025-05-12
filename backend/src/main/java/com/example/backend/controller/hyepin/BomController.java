package com.example.backend.controller.hyepin;

import com.example.backend.dao.hyepin.BomDao;
import com.example.backend.dto.BomDto;
import com.example.backend.entity.Bom;
import com.example.backend.repository.BomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/bom")
public class BomController {

    private final BomRepository bomRepository;
    private final BomDao bomDao;

    //전체 레시피 조회
    @GetMapping
    public ResponseEntity<List<BomDto>> getBomList() {
        List<BomDto> bomList = bomDao.getBomList();
        log.info("getBomList" + bomList);
        return ResponseEntity.ok(bomList);
    }

    //제품별 레시피 조회
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<BomDto>> getBomByProduct(@PathVariable Long productId) {
        List<BomDto> bomList = bomDao.findByProductId(productId);
        return ResponseEntity.ok(bomList);
    }

    //레시피 등록
    @PostMapping
    public ResponseEntity<Bom> createBom(@RequestBody Bom bom) {
        Bom savedBom = bomRepository.save(bom);
        return ResponseEntity.ok(savedBom);
    }

    //레시피 삭제
    @DeleteMapping("/{bomId}")
    public ResponseEntity<Void> deleteBom(@PathVariable Long bomId) {
        if (!bomRepository.existsById(bomId)) {
            return ResponseEntity.notFound().build();
        }
        bomRepository.deleteById(bomId);
        return ResponseEntity.ok().build();
    }

    //제품별 레시피 삭제
    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Void> deleteBomByProduct(@PathVariable Long productId) {
        List<Bom> bomList = bomRepository.findByProductId(productId);
        bomRepository.deleteAll(bomList);
        return ResponseEntity.ok().build();
    }
}
