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
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const BomManagementPage3 = () => {
    // 상태 관리
    const [productList, setProductList] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const [filteredBomList, setFilteredBomList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        materialId: '',
        materialName: '',
        quantity: '',
        unit: '',
        createdAt: '',
        categoryName: '',
    });
    const [bomItems, setBomItems] = useState([]);

    // 제품 목록 가져오기
    useEffect(() => {
        axios.get('/api/product')
            .then(res => setProductList(res.data))
            .catch(err => console.error('제품 조회 실패:', err));
    }, []);

    // 재료 목록 가져오기
    useEffect(() => {
        axios.get('/api/material')
            .then(res => setMaterialList(res.data))
            .catch(err => console.error('재료 조회 실패:', err));
    }, []);

    // BOM 목록 가져오기
    useEffect(() => {
        axios.get('/api/bom')
            .then(res => {
                setBomList(res.data);
                setFilteredBomList(res.data);
            })
            .catch(err => console.error('BOM 조회 실패:', err));
    }, []);

    // 제품 선택 및 검색어 필터링
    useEffect(() => {
        let filtered = bomList;

        // 제품 필터링
        if (selectedProduct) {
            filtered = filtered.filter(bom => bom.productId === selectedProduct);
        }

        // 검색어 필터링
        if (searchKeyword) {
            const keyword = searchKeyword.toLowerCase();
            filtered = filtered.filter(bom =>
                bom.productName?.toLowerCase().includes(keyword) ||
                bom.materialName?.toLowerCase().includes(keyword) ||
                bom.quantity?.toString().includes(keyword) ||
                bom.unit?.toLowerCase().includes(keyword)
            );
        }

        setFilteredBomList(filtered);
    }, [selectedProduct, searchKeyword, bomList]);

    // BOM 등록/수정 다이얼로그 열기
    const handleOpen = (product = null) => {
        if (product) {
            // 제품의 기존 BOM 항목들 가져오기
            axios.get(`/api/bom/product/${product.productId}`)
                .then(res => {
                    setBomItems(res.data);
                    setFormData({
                        productId: product.productId,
                        productName: '',
                        materialId: '',
                        materialName: '',
                        quantity: '',
                        unit: '',
                        createdAt: '',
                        categoryName: '',
                    });
                })
                .catch(err => console.error('BOM 항목 조회 실패:', err));
        } else {
            setBomItems([]);
            setFormData({
                productId: '',
                productName: '',
                materialId: '',
                materialName: '',
                quantity: '',
                unit: '',
                createdAt: '',
                categoryName: '',
            });
        }
        setOpen(true);
    };

    // BOM 항목 추가
    const handleAddBomItem = () => {
        if (!formData.materialId || !formData.quantity || !formData.unit) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const material = materialList.find(m => m.materialId === formData.materialId);
        const newItem = {
            materialId: formData.materialId,
            materialName: material.materialName,
            quantity: formData.quantity,
            unit: formData.unit,
        };

        setBomItems([...bomItems, newItem]);
        setFormData({
            ...formData,
            productId: '',
            productName: '',
            materialId: '',
            materialName: '',
            quantity: '',
            unit: '',
            createdAt: '',
            categoryName: '',
        });
    };

    // BOM 항목 삭제
    const handleRemoveBomItem = (index) => {
        const newItems = bomItems.filter((_, i) => i !== index);
        setBomItems(newItems);
    };

    // BOM 저장
    const handleSave = async () => {
        if (!formData.productId || bomItems.length === 0) {
            alert('제품을 선택하고 최소 하나 이상의 자재를 추가해주세요.');
            return;
        }

        try {
            // 기존 BOM 삭제 후 새로운 BOM 저장
            await axios.delete(`/api/bom/product/${formData.productId}`);
            await axios.post('/api/bom', {
                productId: formData.productId,
                items: bomItems
            });

            // 목록 새로고침
            const res = await axios.get('/api/bom');
            setBomList(res.data);
            setOpen(false);
        } catch (error) {
            alert('저장에 실패했습니다.');
            console.error('BOM 저장 실패:', error);
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
                <Typography variant="h4" gutterBottom>레시피(BOM) 관리</Typography>

                {/* 검색/필터 영역 */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2}}>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel>제품</InputLabel>
                            <Select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                label="제품"
                            >
                                <MenuItem value="">전체</MenuItem>
                                {productList.map(product => (
                                    <MenuItem key={product.productId} value={product.productId}>
                                        {product.productName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="검색어"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="제품명, 재료명, 수량, 단위로 검색"
                            sx={{width: '400px'}}
                        />
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                            레시피 등록
                        </Button>
                    </Box>
                </Box>

                {/* BOM 테이블 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>제품명</TableCell>
                                <TableCell>재료명</TableCell>
                                <TableCell>수량</TableCell>
                                <TableCell>단위</TableCell>
                                <TableCell>카테고리</TableCell>
                                <TableCell align="center">관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(
                                filteredBomList.reduce((acc, item) => {
                                    if (!acc[item.productName]) acc[item.productName] = [];
                                    acc[item.productName].push(item);
                                    return acc;
                                }, {})
                            ).map(([productName, items]) => (
                                <React.Fragment key={productName}>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    🥪 {productName}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handleOpen({ productId: items[0].productId })}
                                                    sx={{ mr: 3 }}
                                                >
                                                    수정
                                                </Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                    {items.map((bom) => (
                                        <TableRow key={bom.bomId}>
                                            <TableCell />
                                            <TableCell>{bom.materialName}</TableCell>
                                            <TableCell>{bom.quantity}</TableCell>
                                            <TableCell>{bom.unit}</TableCell>
                                            <TableCell>{bom.categoryName}</TableCell>
                                            <TableCell align="center">

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>

                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredBomList.length}
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
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>레시피 {formData.productId ? '수정' : '등록'}</DialogTitle>
                    <DialogContent>
                        <Box sx={{mt: 2}}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>제품</InputLabel>
                                <Select
                                    value={formData.productId}
                                    label="제품"
                                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                                >
                                    {productList.map(product => (
                                        <MenuItem key={product.productId} value={product.productId}>
                                            {product.productName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{mt: 2, mb: 2}}>
                                <Typography variant="h6">구성 재료</Typography>
                                <Box sx={{display: 'flex', gap: 1, mb: 1}}>
                                    <FormControl sx={{flex: 2}}>
                                        <InputLabel>재료</InputLabel>
                                        <Select
                                            value={formData.materialId}
                                            label="재료"
                                            onChange={(e) => {
                                                const material = materialList.find(m => m.materialId === e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    materialId: e.target.value,
                                                    unit: material.unit
                                                });
                                            }}
                                        >
                                            {materialList.map(material => (
                                                <MenuItem key={material.materialId} value={material.materialId}>
                                                    {material.materialName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="수량"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                        sx={{flex: 1}}
                                    />
                                    <TextField
                                        label="단위"
                                        value={formData.unit}
                                        disabled
                                        sx={{flex: 1}}
                                    />
                                    <IconButton color="primary" onClick={handleAddBomItem}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>재료명</TableCell>
                                            <TableCell>수량</TableCell>
                                            <TableCell>단위</TableCell>
                                            <TableCell>카테고리</TableCell>
                                            <TableCell align="center">관리</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bomItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.materialName}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.categoryName}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleRemoveBomItem(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
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

export default BomManagementPage3;