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
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';

const statusMap = {
  A: { label: '승인', color: 'success' },
  S: { label: '출고중', color: 'warning' },
  D: { label: '출고완료', color: 'default' },
};

const DeliveryInstructionPage = () => {
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/supply/orders');
      // 승인 상태의 요청만 필터링
      const approvedOrders = response.data.filter(order => order.status === 'A');
      setOrders(approvedOrders);
    } catch (error) {
      console.error('출고 지시 데이터 로드 실패:', error);
    }
  };

  const handleShipmentClick = (order) => {
    setSelectedOrder(order);
    const initial = {};
    order.items.forEach((item) => {
      initial[item.materialId] = item.quantity; // 기본값은 요청 수량
    });
    setShipmentDetails(initial);
    setOpenDialog(true);
  };

  const handleShipmentSubmit = async () => {
    try {
      await axios.post(`/api/supply/orders/${selectedOrder.orderId}/shipment`, {
        items: Object.entries(shipmentDetails).map(([materialId, quantity]) => ({
          materialId: Number(materialId),
          quantity: Number(quantity),
        })),
      });
      setOpenDialog(false);
      fetchOrders(); // 다시 목록 갱신
    } catch (error) {
      console.error('출고 처리 실패:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>출고 지시 관리</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>지시 ID</TableCell>
              <TableCell>요청 ID</TableCell>
              <TableCell>매장</TableCell>
              <TableCell>승인일시</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>자재 목록</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.requestId}</TableCell>
                <TableCell>{order.storeName}</TableCell>
                <TableCell>{order.approvedAt}</TableCell>
                <TableCell>
                  <Chip
                    label={statusMap[order.status]?.label || order.status}
                    color={statusMap[order.status]?.color || 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {(order.items || []).map((item, index) => (
                    <div key={index}>
                      {item.materialName}: {item.quantity} {item.unit}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.status === 'A' && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleShipmentClick(order)}
                    >
                      출고 처리
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>출고 처리</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {selectedOrder?.items.map((item) => (
              <Box key={item.materialId} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {item.materialName} (요청: {item.quantity} {item.unit})
                </Typography>
                <TextField
                  label="출고 수량"
                  type="number"
                  fullWidth
                  value={shipmentDetails[item.materialId] || ''}
                  onChange={(e) =>
                    setShipmentDetails({
                      ...shipmentDetails,
                      [item.materialId]: e.target.value,
                    })
                  }
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleShipmentSubmit} variant="contained">
            출고 처리
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeliveryInstructionPage;
