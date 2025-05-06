import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  MenuItem,
} from '@mui/material';

function StoreManagementPage() {
  // 상태 관리
  const [stores, setStores] = useState([]); // 매장 목록
  const [open, setOpen] = useState(false); // 다이얼로그 열림/닫힘 상태
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 매장
  const [managerOptions, setManagerOptions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(''); // 선택된 지역
  const [formData, setFormData] = useState({
    storeName: '',
    location: '',
    contact: '',
    managerName: '',
    createdAt: '',
  });

  // 지역코드 가져오기
  const getStoreCode = async () => {
    try {
      const groupCode = 'region_code';
      const res = await axios.get(`/api/gubn/${groupCode}`);
      setManagerOptions(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('지역코드를 가져오는데 실패했습니다:', error);
    }
  };

  // 매장 목록 가져오기
  const fetchStores = async () => {
    try {
      const res = await axios.get('/api/stores');
      setStores(res.data);
    } catch (error) {
      console.error('매장 목록을 가져오는데 실패했습니다:', error);
    }
  };

  // 지역별 매장 필터링
  const filteredStores = selectedRegion
    ? stores.filter(store => store.storeCode.startsWith(selectedRegion))
    : stores;

  // 지역 선택 처리
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  // 페이지 로드시 매장 목록, 지역코드 가져오기
  useEffect(() => {
    getStoreCode();
    fetchStores();
  }, []);

  // 매장 등록/수정 다이얼로그 열기
  const handleOpen = (store = null) => {
    if (store) {
      setSelectedStore(store);
      setFormData({
        ...store,
        storeCode: store.storeCode.substring(0, 2) // 지역 코드만 추출
      });
    } else {
      setSelectedStore(null);
      setFormData({
        storeName: '',
        location: '',
        contact: '',
        managerName: '',
        createdAt: '',
        storeCode: ''
      });
    }
    setOpen(true);
  };

  // 다이얼로그 닫기
  const handleClose = () => {
    setOpen(false);
    setSelectedStore(null);
    setFormData({
      storeName: '',
      location: '',
      contact: '',
      managerName: '',
      createdAt: '',
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
      if (!formData.storeCode) {
        alert('지역을 선택해주세요.');
        return;
      }

      let storeCode;
      if (!selectedStore) {
        // 매장 코드 생성
        const codeResponse = await axios.post(`/api/stores/code/generate/${formData.storeCode}`);
        storeCode = codeResponse.data;
      } else {
        storeCode = selectedStore.storeCode;
      }

      const storeData = {
        ...formData,
        storeCode
      };

      if (selectedStore) {
        // 수정
        await axios.put(`/api/stores/${selectedStore.storeId}`, storeData);
      } else {
        // 등록
        await axios.post('/api/stores', storeData);
      }
      
      handleClose();
      fetchStores();
    } catch (error) {
      console.error('매장 저장에 실패했습니다:', error);
      alert('매장 저장에 실패했습니다.');
    }
  };

  // 매장 삭제 처리
  const handleDelete = async (storeId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const res = await axios.delete(`/api/stores/${storeId}`);
        const data = res.data;
        if (res.status === 200 && res.data > 0) {
          alert('삭제 성공!');
        } else {
          alert('삭제 실패 또는 해당 항목 없음');
        }
        fetchStores();
      } catch (error) {
        alert('서버 오류로 삭제에 실패했습니다.');
        console.error('매장 삭제 실패:', error);
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

        {/* 지역 필터 */}
        <Box sx={{ mb: 2 }}>
          <TextField
            select
            label="지역 선택"
            value={selectedRegion}
            onChange={handleRegionChange}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">전체</MenuItem>
            {managerOptions.map((option) => (
              <MenuItem key={option.gubnCode} value={option.gubnCode}>
                {option.gubnName}
              </MenuItem>
            ))}
          </TextField>
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
                <TableCell>생성일</TableCell>
                <TableCell align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.storeId}>
                  <TableCell>{store.storeName}</TableCell>
                  <TableCell>{store.location}</TableCell>
                  <TableCell>{store.contact}</TableCell>
                  <TableCell>{store.managerName}</TableCell>
                  <TableCell>{store.createdAt}</TableCell>
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
                      onClick={() => handleDelete(store.storeId)}
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
                name="storeName"
                label="매장명"
                type="text"
                fullWidth
                value={formData.storeName}
                onChange={handleChange}
                required
              />
              <TextField
                  select
                  margin="dense"
                  name="storeCode"
                  label="지역"
                  fullWidth
                  value={formData.storeCode}
                  onChange={handleChange}
                  required
              >
                {managerOptions.map((option) => (
                    <MenuItem key={option.gubnCode} value={option.gubnCode}>
                      {option.gubnName}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                name="location"
                label="주소"
                type="text"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="contact"
                label="전화번호"
                type="text"
                fullWidth
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="managerName"
                label="담당자"
                type="text"
                fullWidth
                value={formData.managerName}
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