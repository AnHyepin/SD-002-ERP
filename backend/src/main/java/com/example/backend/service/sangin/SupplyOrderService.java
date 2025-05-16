package com.example.backend.service.sangin;

import com.example.backend.dao.sangin.InventoryDao;
import com.example.backend.dao.sangin.SupplyOrderDao;
import com.example.backend.dto.ShipmentItemDto;
import com.example.backend.dto.SupplyOrderDto;
import com.example.backend.dto.SupplyOrderItemDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplyOrderService {

    private final SupplyOrderDao supplyOrderDao;
    private final InventoryDao inventoryDao;

    public List<SupplyOrderDto> getAllOrders() {
        List<SupplyOrderDto> orders = supplyOrderDao.findAllOrders();

        for (SupplyOrderDto order : orders) {
            List<SupplyOrderItemDto> items = supplyOrderDao.findItemsByOrderId(order.getOrderId());
            order.setItems(items); // 지시서별 자재목록 붙이기
        }

        return orders;
    }

    @Transactional
    public void processShipment(Long orderId, List<ShipmentItemDto> items) {
        try {
            // 1. 대상 매장 ID 조회
            Long storeId = supplyOrderDao.findStoreIdByOrderId(orderId);
            if (storeId == null) {
                throw new RuntimeException("매장 정보를 찾을 수 없습니다.");
            }

            // 2. 출고 상태를 'S'(출고중)로 변경
            supplyOrderDao.updateOrderStatus(orderId, "S");

            for (ShipmentItemDto item : items) {
                Long materialId = item.getMaterialId();
                Double qty = item.getQuantity();

                if (qty <= 0) {
                    throw new RuntimeException("출고 수량은 0보다 커야 합니다.");
                }

                // 3. 본사 재고 차감
                inventoryDao.decreaseInventory(1L, materialId, qty);

                // 4. 매장 재고 증가
                inventoryDao.increaseInventory(storeId, materialId, qty);

                // 5. 출고 이력 기록
                supplyOrderDao.insertShipmentLog(orderId, storeId, materialId, qty);
            }

            // 6. 출고 완료 상태로 변경
            supplyOrderDao.markOrderAsShipped(orderId);
        } catch (Exception e) {
            throw new RuntimeException("출고 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Transactional
    public void createOrderByRequestId(Long requestId, Long approvedBy) {
        supplyOrderDao.insertOrderByRequestId(requestId, approvedBy);
    }



}
