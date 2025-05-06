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

    // 지역으로 조회
    public List<StoreDto> getStoreListByRegion(String regionCode) {
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
}