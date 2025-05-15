package com.example.backend.dao.sangin;

import com.example.backend.dto.SupplyRequestCreateDto;
import com.example.backend.dto.SupplyRequestDto;
import com.example.backend.dto.SupplyRequestItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SupplyRequestDao {
    List<SupplyRequestDto> findAllRequests();
    List<SupplyRequestItemDto> findItemsByRequestId(Long requestId);
    void insertRequest(SupplyRequestCreateDto dto);
    void insertRequestItem(@Param("requestId") Long requestId, @Param("dto") SupplyRequestCreateDto dto);
    void updateRequestStatus(@Param("requestId") Long requestId,
                             @Param("status") String status);


}
