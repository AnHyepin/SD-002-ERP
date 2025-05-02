package dao.hyepin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import dto.StoreDto;

@Mapper
public interface StoreDao {
    public StoreDto getStoreById(int id);
    public StoreDto getStoreByName(String name);
    public List<StoreDto> getAllStores();
    public int addStore(StoreDto storeDto);
    public int updateStore(StoreDto storeDto);
    public int deleteStore(int id);
    public Integer getLastStoreNumber(String regionCode);
}
