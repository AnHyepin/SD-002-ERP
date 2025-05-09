package com.example.backend.service.hyepin;

import com.example.backend.dao.hyepin.MaterialDao;
import com.example.backend.dto.MaterialDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialDao materialDao;

    public List<MaterialDto> getMaterialList() {
        log.info("getMaterialList" + materialDao.findAll());
        return materialDao.findAll();
    }

    public int saveMaterial(MaterialDto materialDto) {
        return materialDao.saveMaterial(materialDto);
    }

    public int updateMaterial(MaterialDto materialDto){
        return materialDao.updateMaterial(materialDto);
    }

    public int deleteMaterial(int materialId){
        return materialDao.deleteMaterial(materialId);
    }
}
