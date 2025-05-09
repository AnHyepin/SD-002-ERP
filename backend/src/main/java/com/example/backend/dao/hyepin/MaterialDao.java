package com.example.backend.dao.hyepin;

import com.example.backend.dto.MaterialDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MaterialDao {

    public List<MaterialDto> findAll();
    public int saveMaterial(MaterialDto materialDto);
    public int updateMaterial(MaterialDto materialDto);
    public int deleteMaterial(int materialId);

}
