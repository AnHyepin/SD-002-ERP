import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const statusMap = {
  'S': { label: '출고중', color: 'warning' },
  'D': { label: '출고완료', color: 'default' },
};

const DeliveryProcessPage = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('/api/supply/shipments');
      setShipments(response.data);
      setFilteredShipments(response.data);
    } catch (error) {
      console.error('출고 이력 데이터 로드 실패:', error);
    }
  };

  // 검색어와 상태 필터 적용
  useEffect(() => {
    const filtered = shipments.filter((shipment) => {
      const matchesSearch = 
        shipment.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.materialName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredShipments(filtered);
  }, [searchTerm, statusFilter, shipments]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>출고 이력 관리</Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="매장/자재명 검색"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 200 }}
        />
        
        <FormControl sx={{ width: 200 }}>
          <InputLabel>상태</InputLabel>
          <Select
            value={statusFilter}
            label="상태"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="S">출고중</MenuItem>
            <MenuItem value="D">출고완료</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>출고 ID</TableCell>
              <TableCell>지시 ID</TableCell>
              <TableCell>매장</TableCell>
              <TableCell>자재명</TableCell>
              <TableCell>출고 수량</TableCell>
              <TableCell>단위</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>출고일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment.shipmentId}>
                <TableCell>{shipment.shipmentId}</TableCell>
                <TableCell>{shipment.orderId}</TableCell>
                <TableCell>{shipment.storeName}</TableCell>
                <TableCell>{shipment.materialName}</TableCell>
                <TableCell>{shipment.quantity}</TableCell>
                <TableCell>{shipment.unit}</TableCell>
                <TableCell>
                  <Chip
                    label={statusMap[shipment.status]?.label}
                    color={statusMap[shipment.status]?.color}
                    size="small"
                  />
                </TableCell>
                <TableCell>{shipment.shippedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeliveryProcessPage; 