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
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';

const MaterialManagementPage = () => {

    //상태 관리
    const [materialList, setMaterialList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        materialName: '',
        unit: '',
        categoryCode: '',
    });

    // 자재 카테고리 가져오기
    useEffect(() => {
        axios.get('/api/gubn/material_category')
            .then(res => setCategoryList(res.data))
            .catch(err => console.error('카테고리 조회 실패:', err));
    }, []);

    // 자재 전체 조회
    useEffect(() => {
        axios.get('/api/materials')
            .then(res => setMaterialList(res.data))
            .catch(err => console.error('자재 조회 실패:', err));
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>자재 관리</Typography>

                {/* 검색/필터 영역 */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>카테고리</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            label="카테고리"
                        >
                            <MenuItem value="">전체</MenuItem>
                            {categoryList.map(cat => (
                                <MenuItem key={cat.gubnCode} value={cat.gubnCode}>
                                    {cat.gubnName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="검색어"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <Button variant="contained">검색</Button>
                    <Button variant="contained" color="success" onClick={() => setOpen(true)}>자재 등록</Button>
                </Box>

                {/* 자재 테이블 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>자재명</TableCell>
                                <TableCell>단위</TableCell>
                                <TableCell>카테고리</TableCell>
                                <TableCell align="right">작업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materialList.map((mat, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{mat.materialName}</TableCell>
                                    <TableCell>{mat.unit}</TableCell>
                                    <TableCell>{mat.categoryName}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="outlined" sx={{ mr: 1 }}>수정</Button>
                                        <Button size="small" variant="outlined" color="error">삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* 등록/수정 다이얼로그 */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>자재 등록</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="자재명"
                            fullWidth
                            margin="normal"
                            value={formData.materialName}
                            onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                        />
                        <TextField
                            label="단위"
                            fullWidth
                            margin="normal"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>카테고리</InputLabel>
                            <Select
                                value={formData.categoryCode}
                                label="카테고리"
                                onChange={(e) => setFormData({ ...formData, categoryCode: e.target.value })}
                            >
                                {categoryList.map(cat => (
                                    <MenuItem key={cat.gubnCode} value={cat.gubnCode}>
                                        {cat.gubnName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>취소</Button>
                        <Button variant="contained">저장</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default MaterialManagementPage;
