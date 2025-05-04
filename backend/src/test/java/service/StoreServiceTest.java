package service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.backend.dao.hyepin.GubnDao;
import com.example.backend.dao.hyepin.StoreDao;
import com.example.backend.dto.GubnDto;
import com.example.backend.service.hyepin.StoreService;

@ExtendWith(MockitoExtension.class)
class StoreServiceTest {

    @Mock
    private GubnDao gubnMapper;

    @Mock
    private StoreDao storeDao;

    @InjectMocks
    private StoreService storeService;

    private static final String REGION_CODE = "JJ";
    private static final String INVALID_REGION_CODE = "XX";

    @BeforeEach
    void setUp() {
        // 기본적인 mock 설정
        when(gubnMapper.checkGubn(StoreService.REGION_GROUP_CODE, REGION_CODE)).thenReturn(1);
        when(gubnMapper.checkGubn(StoreService.REGION_GROUP_CODE, INVALID_REGION_CODE)).thenReturn(0);
    }

    @Test
    @DisplayName("유효한 지역 코드로 매장 코드 생성")
    void generateStoreCode_WithValidRegionCode_ShouldGenerateCode() {
        // given
        when(storeDao.getLastStoreNumber(REGION_CODE)).thenReturn(1);

        // when
        String storeCode = storeService.generateStoreCode(REGION_CODE);

        // then
        assertEquals("JJ2", storeCode);
        verify(gubnMapper).checkGubn(StoreService.REGION_GROUP_CODE, REGION_CODE);
        verify(storeDao).getLastStoreNumber(REGION_CODE);
    }

    @Test
    @DisplayName("첫 번째 매장 코드 생성")
    void generateStoreCode_FirstStore_ShouldGenerateCodeWithOne() {
        // given
        when(storeDao.getLastStoreNumber(REGION_CODE)).thenReturn(null);

        // when
        String storeCode = storeService.generateStoreCode(REGION_CODE);

        // then
        assertEquals("JJ1", storeCode);
    }

    @Test
    @DisplayName("유효하지 않은 지역 코드로 매장 코드 생성 시도")
    void generateStoreCode_WithInvalidRegionCode_ShouldThrowException() {
        // when & then
        assertThrows(IllegalArgumentException.class, () -> {
            storeService.generateStoreCode(INVALID_REGION_CODE);
        });
    }

    @Test
    @DisplayName("지역 코드 목록 조회")
    void getRegionCodes_ShouldReturnList() {
        // given
        List<String> expectedCodes = Arrays.asList("JJ", "GG", "GW");
        when(gubnMapper.getGubnCodes(StoreService.REGION_GROUP_CODE)).thenReturn(expectedCodes);

        // when
        List<String> actualCodes = storeService.getRegionCodes();

        // then
        assertEquals(expectedCodes, actualCodes);
        verify(gubnMapper).getGubnCodes(StoreService.REGION_GROUP_CODE);
    }

    @Test
    @DisplayName("지역 코드와 이름 목록 조회")
    void getRegionCodeList_ShouldReturnList() {
        // given
        List<GubnDto> expectedList = Arrays.asList(
                createGubnDto("JJ", "제주"),
                createGubnDto("GG", "경기"));
        when(gubnMapper.getGubnList(StoreService.REGION_GROUP_CODE)).thenReturn(expectedList);

        // when
        List<GubnDto> actualList = storeService.getRegionCodeList();

        // then
        assertEquals(expectedList, actualList);
        verify(gubnMapper).getGubnList(StoreService.REGION_GROUP_CODE);
    }

    private GubnDto createGubnDto(String code, String name) {
        GubnDto dto = new GubnDto();
        dto.setGubnCode(code);
        dto.setGubnName(name);
        return dto;
    }
}