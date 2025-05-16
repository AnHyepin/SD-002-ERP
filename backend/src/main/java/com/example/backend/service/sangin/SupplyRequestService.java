package com.example.backend.service.sangin;

import com.example.backend.dao.sangin.SupplyOrderDao;
import com.example.backend.dao.sangin.SupplyRequestDao;
import com.example.backend.dto.SupplyRequestCreateDto;
import com.example.backend.dto.SupplyRequestDto;
import com.example.backend.dto.SupplyRequestItemDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplyRequestService {

    private final SupplyRequestDao supplyRequestDao;
    private final SupplyOrderDao supplyOrderDao;

    public List<SupplyRequestDto> getAllRequests() {
        List<SupplyRequestDto> requests = supplyRequestDao.findAllRequests();

        for (SupplyRequestDto request : requests) {
            List<SupplyRequestItemDto> items = supplyRequestDao.findItemsByRequestId(request.getRequestId());
            request.setItems(items);  // ✅ 여기서 붙여줌
        }

        return requests;
    }

    public void createRequest(SupplyRequestCreateDto dto) {
        // 1. 요청서 insert → requestId 자동 주입됨
        supplyRequestDao.insertRequest(dto);

        // 2. 요청 항목 insert 시 dto.requestId 그대로 사용
        supplyRequestDao.insertRequestItem(dto.getRequestId(), dto);
    }

    @Transactional
    public void updateRequestStatus(Long requestId, String status) {
        // 1. 요청 상태 변경
        supplyRequestDao.updateRequestStatus(requestId, status);

        // 2. 승인일 경우 출고 지시서 생성
        if ("A".equals(status)) {
            Long approvedBy = 1L; // TODO: 로그인 사용자 ID로 교체할 것
            supplyOrderDao.insertOrderByRequestId(requestId, approvedBy);
        }
    }


}
