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
} from '@mui/material';
import axios from 'axios';

const statusMap = {
  'R': { label: '요청', color: 'info' },
  'A': { label: '승인', color: 'success' },
  'S': { label: '출고중', color: 'warning' },
  'D': { label: '출고완료', color: 'default' },
  'X': { label: '취소', color: 'error' },
};

const SupplyRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/supply/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('공급 요청 데이터 로드 실패:', error);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`/api/supply/requests/${requestId}/status`, {
        status: newStatus
      });
      fetchRequests(); // 목록 새로고침
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>공급 요청 관리</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>요청 ID</TableCell>
              <TableCell>매장</TableCell>
              <TableCell>요청일시</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>자재 목록</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{request.storeName}</TableCell>
                <TableCell>{request.requestedAt}</TableCell>
                <TableCell>
                  <Chip
                    label={statusMap[request.status]?.label}
                    color={statusMap[request.status]?.color}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {request.items.map((item, index) => (
                    <div key={index}>
                      {item.materialName}: {item.quantity} {item.unit}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {request.status === 'R' && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusChange(request.requestId, 'A')}
                        sx={{ mr: 1 }}
                      >
                        승인
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleStatusChange(request.requestId, 'X')}
                      >
                        취소
                      </Button>
                    </>
                  )}
                  {request.status === 'A' && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleStatusChange(request.requestId, 'S')}
                    >
                      출고 시작
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SupplyRequestPage; 