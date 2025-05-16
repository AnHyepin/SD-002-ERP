package com.example.backend.service.sangin;


import com.example.backend.dao.sangin.ShipmentDao;
import com.example.backend.dto.ShipmentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentDao shipmentDao;

    public List<ShipmentDto> getAllShipments() {
        return shipmentDao.findAllShipments();
    }
}
