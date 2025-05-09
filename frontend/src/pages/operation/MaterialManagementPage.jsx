import React, {useState, useEffect} from 'react';
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
    TablePagination,
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
    const [filteredMaterialList, setFilteredMaterialList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [unitCodes, setUnitCodes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [formData, setFormData] = useState({
        materialName: '',
        unit: '',
        unitPrice: '',
        createdAt: '',
        category: '',
        categoryName: '',
    });

    // 원재료 카테고리 가져오기
    useEffect(() => {
        axios.get('/api/gubn/material_category')
            .then(res => setCategoryList(res.data))
            .catch(err => console.error('카테고리 조회 실패:', err));
    }, []);

    // 단위코드 가져오기
    useEffect(() => {
        axios.get('/api/gubn/unit_code')
            .then(res => setUnitCodes(res.data))
            .catch(err => console.error('단위코드 조회 실패:', err));
    }, []);

    // 원재료 전체 조회
    useEffect(() => {
        axios.get('/api/material')
            .then(res => {
                setMaterialList(res.data);
                setFilteredMaterialList(res.data);
            })
            .catch(err => console.error('원재료 조회 실패:', err));
    }, []);

    // 카테고리 필터링 및 검색어 필터링
    useEffect(() => {
        let filtered = materialList;

        // 카테고리 필터링
        if (selectedCategory) {
            filtered = filtered.filter(material => material.category === selectedCategory);
        }

        // 검색어 필터링
        if (searchKeyword) {
            const keyword = searchKeyword.toLowerCase();
            filtered = filtered.filter(material =>
                material.materialName?.toLowerCase().includes(keyword) ||
                material.unit?.toLowerCase().includes(keyword) ||
                material.unitPrice?.toString().includes(keyword) ||
                material.categoryName?.toLowerCase().includes(keyword) ||
                material.createdAt?.toLowerCase().includes(keyword)
            );
        }

        setFilteredMaterialList(filtered);
    }, [selectedCategory, searchKeyword, materialList]);

    // 원재료 등록/수정 다이얼로그 열기
    const handleOpen = (material = null) => {
        if (material) {
            setFormData({
                ...material,
                category: material.category || '',
                categoryName: material.categoryName || '',
            });
        } else {
            setFormData({
                materialName: '',
                unit: '',
                unitPrice: '',
                createdAt: '',
                category: '',
                categoryName: '',
            });
        }
        setOpen(true);
    };

    // 카테고리 선택 처리
    const handleCategoryChange = (e) => {
        const selectedCode = e.target.value;
        const selectedCategory = categoryList.find(cat => cat.gubnCode === selectedCode);
        
        setFormData({
            ...formData,
            category: selectedCode,
            categoryName: selectedCategory ? selectedCategory.gubnName : '',
        });
    };

    // 원재료 삭제 처리
    const handleDelete = async (materialId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const res = await axios.delete(`/api/material/${materialId}`);
                if (res.status === 200 && res.data > 0) {
                    alert('삭제 성공!');
                    // 목록 새로고침
                    const updatedList = materialList.filter(material => material.materialId !== materialId);
                    setMaterialList(updatedList);
                } else {
                    alert('삭제 실패 또는 해당 항목 없음');
                }
            } catch (error) {
                alert('서버 오류로 삭제에 실패했습니다.');
                console.error('원재료 삭제 실패:', error);
            }
        }
    };

    // 원재료 저장 처리
    const handleSave = async () => {
        try {
            const saveData = {
                ...formData,
                category: formData.category,
            };

            if (formData.materialId) {
                // 수정
                await axios.put('/api/material', saveData);
            } else {
                // 등록
                await axios.post('/api/material', saveData);
            }
            // 목록 새로고침
            const res = await axios.get('/api/material');
            setMaterialList(res.data);
            setOpen(false);
        } catch (error) {
            alert('저장에 실패했습니다.');
            console.error('원재료 저장 실패:', error);
        }
    };

    // 페이지 변경 핸들러
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // 페이지당 행 수 변경 핸들러
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h4" gutterBottom>원재료 관리</Typography>

                {/* 검색/필터 영역 */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2}}>
                    <Box sx={{display: 'flex', gap: 1}}>

                        <FormControl sx={{minWidth: 200}}>
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
                            placeholder="원재료명, 단위, 단위금액, 카테고리, 생성일로 검색"
                            sx={{width: '400px'}}
                        />
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" onClick={() => handleOpen()}>원재료 등록</Button>
                    </Box>
                </Box>

                {/* 원재료 테이블 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>원재료명</TableCell>
                                <TableCell>단위</TableCell>
                                <TableCell>단위금액</TableCell>
                                <TableCell>카테고리</TableCell>
                                <TableCell>생성일</TableCell>
                                <TableCell align="center">관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMaterialList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((mat) => (
                                    <TableRow key={mat.materialId}>
                                        <TableCell>{mat.materialName}</TableCell>
                                        <TableCell>{mat.unit}</TableCell>
                                        <TableCell>{mat.unitPrice}</TableCell>
                                        <TableCell>{mat.categoryName}</TableCell>
                                        <TableCell>{mat.createdAt}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleOpen(mat)}
                                                sx={{mr: 1}}
                                            >
                                                수정
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(mat.materialId)}
                                            >
                                                삭제
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredMaterialList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="페이지당 행 수"
                        labelDisplayedRows={({ from, to, count }) => 
                            `${Math.floor(from / rowsPerPage) + 1}페이지 (총 ${Math.ceil(count / rowsPerPage)}페이지)`
                        }
                    />
                </TableContainer>

                {/* 등록/수정 다이얼로그 */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{formData.materialId ? '원재료 수정' : '원재료 등록'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="원재료명"
                            fullWidth
                            margin="normal"
                            value={formData.materialName}
                            onChange={(e) => setFormData({...formData, materialName: e.target.value})}
                        />
                        <TextField
                            select
                            label="단위"
                            fullWidth
                            margin="normal"
                            value={formData.unit}
                            onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        >
                            <MenuItem value="">선택</MenuItem>
                            {unitCodes.map((code) => (
                                <MenuItem key={code.gubnCode} value={code.gubnCode}>
                                    {code.gubnName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="단위금액"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={formData.unitPrice}
                            onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                            InputProps={{
                                endAdornment: <span>원</span>,
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>카테고리</InputLabel>
                            <Select
                                value={formData.category}
                                label="카테고리"
                                onChange={handleCategoryChange}
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
                        <Button variant="contained" onClick={handleSave}>저장</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default MaterialManagementPage;
