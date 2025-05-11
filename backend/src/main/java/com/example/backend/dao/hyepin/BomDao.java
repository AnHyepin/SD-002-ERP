package com.example.backend.dao.hyepin;

import com.example.backend.dto.BomDto;
import com.example.backend.dto.StoreDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BomDao {
    public List<BomDto> getBomList();
    public List<BomDto> findByProductId(Long productId);

}
