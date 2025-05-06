package com.example.backend.service.hyepin;

import com.example.backend.dao.hyepin.GubnDao;
import com.example.backend.dto.GubnDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GubnService {

    private final GubnDao gubnDao;

    public List<GubnDto> getGubnList(String groupCode) {
        return gubnDao.getGubnList(groupCode);
    }

    public GubnDto getGubn(String groupCode, String gubnCode) {
        return gubnDao.getGubn(groupCode, gubnCode);
    }
}
