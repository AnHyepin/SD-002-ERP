import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';

const StoreInventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState('');

  const storeId = 1;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`/api/inventory/store?storeId=${storeId}`);
        setInventory(response.data);
        setFilteredInventory(response.data);
      } catch (error) {
        console.error('재고 데이터 로드 실패:', error);
      }
    };

    fetchInventory();
  }, [storeId]);


  // 검색어와 카테고리 필터 적용
  useEffect(() => {
    const filtered = inventory.filter((item) => {
      const matchesSearch = item.materialName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    setFilteredInventory(filtered);
  }, [searchTerm, categoryFilter, inventory]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>본사 재고 관리</Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="자재명 검색"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 200 }}
        />
        
        <FormControl sx={{ width: 200 }}>
          <InputLabel>카테고리</InputLabel>
          <Select
            value={categoryFilter}
            label="카테고리"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">전체</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.code} value={category.code}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>자재 코드</TableCell>
              <TableCell>자재명</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>현재 수량</TableCell>
              <TableCell>단위</TableCell>
              <TableCell>유통기한</TableCell>
              <TableCell>최근 입고일</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.inventoryId}>
                <TableCell>{item.materialId}</TableCell>
                <TableCell>{item.materialName}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.expiredAt}</TableCell>
                <TableCell>{item.createdAt}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default StoreInventoryPage; 