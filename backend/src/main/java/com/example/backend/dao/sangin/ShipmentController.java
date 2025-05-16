package com.example.backend.dao.sangin;

import com.example.backend.dto.ShipmentDto;
import com.example.backend.service.sangin.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supply")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @GetMapping("/shipments")
    public List<ShipmentDto> getAllShipments() {
        return shipmentService.getAllShipments();
    }
}
