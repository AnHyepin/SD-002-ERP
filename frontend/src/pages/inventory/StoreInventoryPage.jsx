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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const StoreInventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState('');

  const storeId = 2; // 예시: 실제로는 localStorage.getItem('storeId') 또는 props 등에서 가져와야 함 수정수정

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

  const handleRequestClick = (material) => {
    setSelectedMaterial(material);
    setOpenRequestDialog(true);
  };

  const handleRequestSubmit = async () => {
    try {
      await axios.post('/api/supply/request', {
        storeId,
        materialId: selectedMaterial.materialId,
        quantity: Number(requestQuantity),
      });
      setOpenRequestDialog(false);
      setRequestQuantity('');
      // 성공 메시지 표시
    } catch (error) {
      console.error('자재 요청 실패:', error);
      // 에러 메시지 표시
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>매장 재고 관리</Typography>
      
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
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleRequestClick(item)}
                  >
                    자재 요청
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 자재 요청 다이얼로그 */}
      <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)}>
        <DialogTitle>자재 요청</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              자재명: {selectedMaterial?.materialName}
            </Typography>
            <TextField
              label="요청 수량"
              type="number"
              fullWidth
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRequestDialog(false)}>취소</Button>
          <Button onClick={handleRequestSubmit} variant="contained">
            요청하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreInventoryPage; 