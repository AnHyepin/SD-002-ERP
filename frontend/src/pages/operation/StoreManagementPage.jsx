import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

function StoreManagementPage() {
  // 상태 관리
  const [stores, setStores] = useState([]); // 매장 목록
  const [open, setOpen] = useState(false); // 다이얼로그 열림/닫힘 상태
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 매장
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
  });

  // 매장 목록 가져오기
  const fetchStores = async () => {
    try {
      // TODO: 실제 API 연동
      const response = await fetch('/api/stores');
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('매장 목록을 가져오는데 실패했습니다:', error);
    }
  };

  // 페이지 로드시 매장 목록 가져오기
  useEffect(() => {
    fetchStores();
  }, []);

  // 매장 등록/수정 다이얼로그 열기
  const handleOpen = (store = null) => {
    if (store) {
      setSelectedStore(store);
      setFormData(store);
    } else {
      setSelectedStore(null);
      setFormData({
        name: '',
        address: '',
        phone: '',
        manager: '',
      });
    }
    setOpen(true);
  };

  // 다이얼로그 닫기
  const handleClose = () => {
    setOpen(false);
    setSelectedStore(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      manager: '',
    });
  };

  // 입력 필드 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 매장 등록/수정 처리
  const handleSubmit = async () => {
    try {
      if (selectedStore) {
        // 수정
        await fetch(`/api/stores/${selectedStore.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // 등록
        await fetch('/api/stores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      handleClose();
      fetchStores();
    } catch (error) {
      console.error('매장 저장에 실패했습니다:', error);
    }
  };

  // 매장 삭제 처리
  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/stores/${id}`, {
          method: 'DELETE',
        });
        fetchStores();
      } catch (error) {
        console.error('매장 삭제에 실패했습니다:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* 제목과 등록 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            매장 관리
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            매장 등록
          </Button>
        </Box>

        {/* 매장 목록 테이블 */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>매장명</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>담당자</TableCell>
                <TableCell align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.phone}</TableCell>
                  <TableCell>{store.manager}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpen(store)}
                      sx={{ mr: 1 }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(store.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 매장 등록/수정 다이얼로그 */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedStore ? '매장 정보 수정' : '새 매장 등록'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="매장명"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="address"
                label="주소"
                type="text"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="phone"
                label="전화번호"
                type="text"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="manager"
                label="담당자"
                type="text"
                fullWidth
                value={formData.manager}
                onChange={handleChange}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedStore ? '수정' : '등록'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default StoreManagementPage; 