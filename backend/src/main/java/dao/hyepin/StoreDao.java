package dao.hyepin;

import dto.StoreDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StoreDao {
    public StoreDto getStoreById(int id);
    public StoreDto getStoreByName(String name);
    public List<StoreDto> getAllStores();
    public int addStore(StoreDto storeDto);
    public int updateStore(StoreDto storeDto);
    public int deleteStore(int id);
}
