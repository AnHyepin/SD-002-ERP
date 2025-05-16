package com.example.backend.dao.sangin;


import com.example.backend.dto.SupplyOrderDto;
import com.example.backend.dto.SupplyOrderItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SupplyOrderDao {
    List<SupplyOrderDto> findAllOrders();

    List<SupplyOrderItemDto> findItemsByOrderId(@Param("orderId") Long orderId);

    void insertOrderByRequestId(@Param("requestId") Long requestId, @Param("approvedBy") Long approvedBy);


    Long findStoreIdByOrderId(@Param("orderId") Long orderId);

    void insertShipmentLog(
            @Param("orderId") Long orderId,
            @Param("storeId") Long storeId,
            @Param("materialId") Long materialId,
            @Param("quantity") Double quantity
    );

    void markOrderAsShipped(@Param("orderId") Long orderId);

    void updateOrderStatus(
        @Param("orderId") Long orderId,
        @Param("status") String status
    );




}