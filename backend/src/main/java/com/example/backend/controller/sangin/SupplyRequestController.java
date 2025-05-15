package com.example.backend.controller.sangin;

import com.example.backend.dto.SupplyRequestCreateDto;
import com.example.backend.dto.SupplyRequestDto;
import com.example.backend.dto.SupplyRequestStatusUpdateDto;
import com.example.backend.service.sangin.SupplyRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supply")
@RequiredArgsConstructor
public class SupplyRequestController {

    private final SupplyRequestService supplyRequestService;

    @GetMapping("/requests")
    public List<SupplyRequestDto> getAllRequests() {
        return supplyRequestService.getAllRequests();
    }
    @PostMapping("/request")
    public ResponseEntity<Void> createRequest(@RequestBody SupplyRequestCreateDto dto) {
        supplyRequestService.createRequest(dto);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/requests/{requestId}/status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable Long requestId,
            @RequestBody SupplyRequestStatusUpdateDto dto) {
        supplyRequestService.updateRequestStatus(requestId, dto.getStatus());
        return ResponseEntity.ok().build();
    }

}
