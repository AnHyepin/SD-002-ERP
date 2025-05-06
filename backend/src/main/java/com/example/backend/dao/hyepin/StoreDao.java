package com.example.backend.dao.hyepin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.dto.StoreDto;

@Mapper
public interface StoreDao {
    public List<StoreDto> findAll();
    public StoreDto getStoreById(int id);
    public StoreDto getStoreByName(String name);
    public List<StoreDto> getAllStores();
    public int addStore(StoreDto storeDto);
    public int updateStore(StoreDto storeDto);
    public int deleteStore(int id);
    public Integer getLastStoreNumber(String regionCode);
    public List<StoreDto> getStoreListByRegion(String regionCode);
    public List<StoreDto> getStoreListByName(String storeName);

}
