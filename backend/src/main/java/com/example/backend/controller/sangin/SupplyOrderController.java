package com.example.backend.controller.sangin;

import com.example.backend.dto.ShipmentRequestDto;
import com.example.backend.dto.SupplyOrderDto;
import com.example.backend.service.sangin.SupplyOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/supply")
@RequiredArgsConstructor
public class SupplyOrderController {
    private final SupplyOrderService supplyOrderService;
    @GetMapping("/orders")
    public List<SupplyOrderDto> getAllOrders() {
        return supplyOrderService.getAllOrders();
    }
    @PostMapping("/orders/{orderId}/shipment")
    public ResponseEntity<Void> processShipment(
            @PathVariable Long orderId,
            @RequestBody ShipmentRequestDto shipmentRequestDto
    ) {
        supplyOrderService.processShipment(orderId, shipmentRequestDto.getItems());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/orders")
    public ResponseEntity<Void> createOrder(@RequestBody Map<String, Long> requestBody) {
        Long requestId = requestBody.get("requestId");
        // 예시로 로그인 사용자 ID를 1L로 임시 지정
        Long approvedBy = 1L;

        supplyOrderService.createOrderByRequestId(requestId, approvedBy);
        return ResponseEntity.ok().build();
    }



}
