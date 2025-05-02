package service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dao.hyepin.GubnDao;
import dao.hyepin.StoreDao;

@Service
public class StoreCodeGenerator {
    
    private static final String REGION_GROUP_CODE = "region_code";
    
    @Autowired
    private GubnDao gubnMapper;
    
    @Autowired
    private StoreDao storeDao;
    
    /**
     * 지역 코드를 기반으로 매장 코드를 생성합니다.
     * @param regionCode 지역 코드 (예: "JJ")
     * @return 생성된 매장 코드 (예: "JJ1")
     */
    @Transactional(readOnly = true)
    public String generateStoreCode(String regionCode) {
        // 1. 지역 코드가 유효한지 확인
        int count = gubnMapper.checkGubn(REGION_GROUP_CODE, regionCode);
        
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
    
    /**
     * 지역 코드 목록을 조회합니다.
     * @return 지역 코드 목록
     */
    public List<String> getRegionCodes() {
        return gubnMapper.getGubnCodes(REGION_GROUP_CODE);
    }
    
    /**
     * 지역 코드와 이름을 함께 조회합니다.
     * @return 지역 코드와 이름 목록
     */
    public List<Map<String, String>> getRegionCodeList() {
        return gubnMapper.getGubnList(REGION_GROUP_CODE);
    }
} 