package com.example.backend.dao.sangin;

import com.example.backend.dto.ShipmentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShipmentDao {
    List<ShipmentDto> findAllShipments();
}
