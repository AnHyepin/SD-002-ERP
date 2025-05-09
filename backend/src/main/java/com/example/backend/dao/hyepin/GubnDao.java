package com.example.backend.dao.hyepin;

import java.util.List;
import com.example.backend.dto.GubnDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GubnDao {
    // 특정 그룹의 모든 코드 조회
    public List<GubnDto> getGubnList(String groupCode);

    // 특정 그룹의 특정 코드 조회
    public GubnDto getGubn(String groupCode, String gubnCode);

    // 특정 그룹의 코드 존재 여부 확인
    public int checkGubn(String groupCode, String gubnCode);

    // 특정 그룹의 코드 목록만 조회
    public List<String> getGubnCodes(String groupCode, String gubnCode);
}