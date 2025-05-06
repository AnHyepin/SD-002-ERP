package com.example.backend.service.hyepin;

import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dao.hyepin.GubnDao;
import com.example.backend.dao.hyepin.StoreDao;
import com.example.backend.dto.GubnDto;
import com.example.backend.dto.StoreDto;
import com.example.backend.entity.Store;
import com.example.backend.repository.StoreRepository;

@Service
@Slf4j
public class StoreService {

    protected static final String REGION_GROUP_CODE = "region_code";

    @Autowired
    private GubnDao gubnDao;

    @Autowired
    private StoreDao storeDao;

    @Autowired
    private StoreRepository storeRepository;

    // 매장 코드 생성
    @Transactional(readOnly = true)
    public String generateStoreCode(String regionCode) {
        // 1. 지역 코드가 유효한지 확인
        int count = gubnDao.checkGubn(REGION_GROUP_CODE, regionCode);

        if (count == 0) {
            throw new IllegalArgumentException("Invalid region code: " + regionCode);
        }

        // 2. 해당 지역의 마지막 매장 번호를 조회
        Integer lastNumber = storeDao.getLastStoreNumber(regionCode);

        // 3. 새로운 번호 생성 (없으면 1부터 시작)
        int newNumber = (lastNumber == null) ? 1 : lastNumber + 1;

        // 4. 새로운 매장 코드 생성 (예: "JJ1", "JJ2", ...)
        return regionCode + newNumber;
    }

    // 매장 코드에서 지역 코드 추출
    private String extractRegionCode(String storeCode) {
        if (storeCode == null || storeCode.length() < 2) {
            throw new IllegalArgumentException("Invalid store code format");
        }
        return storeCode.substring(0, 2);
    }

    // 지역으로 조회
    public List<StoreDto> getStoreListByRegion(String regionCode) {
        // 지역 코드가 2글자가 아닌 경우 처리
        if (regionCode.length() > 2) {
            regionCode = regionCode.substring(0, 2);
        }
        return storeDao.getStoreListByRegion(regionCode);
    }

    // 이름으로 조회
    public List<StoreDto> getStoreListByName(String storeName) {
        return storeDao.getStoreListByName(storeName);
    }

    //전체 매장 조회
    public List<StoreDto> getAllStores() {
        List<StoreDto> stores = storeDao.findAll();
        return stores;
    }

    //매장 삭제
    public int deleteStore(int storeId) {
        return storeDao.deleteStore(storeId);
    }

    // 매장 등록
    @Transactional
    public StoreDto createStore(StoreDto storeDto) {
        // 매장 코드 유효성 검사
        if (storeDto.getStoreCode() == null || storeDto.getStoreCode().isEmpty()) {
            throw new IllegalArgumentException("Store code is required");
        }

        // 매장명 중복 검사
        List<StoreDto> existingStores = storeDao.getStoreListByName(storeDto.getStoreName());
        if (!existingStores.isEmpty()) {
            throw new IllegalArgumentException("Store name already exists");
        }

        // 매장 등록
        storeDao.addStore(storeDto);
        return storeDto;
    }

    // 매장 수정
    @Transactional
    public StoreDto updateStore(StoreDto storeDto) {
        // 매장 존재 여부 확인
        StoreDto existingStore = storeDao.getStoreById(storeDto.getStoreId().intValue());
        if (existingStore == null) {
            throw new IllegalArgumentException("Store not found");
        }

        // 매장명 중복 검사 (자기 자신 제외)
        List<StoreDto> existingStores = storeDao.getStoreListByName(storeDto.getStoreName());
        if (!existingStores.isEmpty() && !existingStores.get(0).getStoreId().equals(storeDto.getStoreId())) {
            throw new IllegalArgumentException("Store name already exists");
        }

        // 지역 변경 여부 확인
        String newRegionCode = extractRegionCode(storeDto.getStoreCode());
        String oldRegionCode = extractRegionCode(existingStore.getStoreCode());

        if (!newRegionCode.equals(oldRegionCode)) {
            // 지역이 변경된 경우 새로운 매장 코드 생성
            String newStoreCode = generateStoreCode(newRegionCode);
            storeDto.setStoreCode(newStoreCode);
        } else {
            // 같은 지역인 경우 기존 매장 코드 유지
            storeDto.setStoreCode(existingStore.getStoreCode());
        }

        // 매장 수정
        storeDao.updateStore(storeDto);
        return storeDto;
    }
}