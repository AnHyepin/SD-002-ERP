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
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        description: '',
        price: '',
        image: null
    });
    const [previewUrl, setPreviewUrl] = useState('');

    // 제품 목록 가져오기
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product');
            setProducts(response.data);
        } catch (error) {
            console.error('제품 조회 실패:', error);
        }
    };

    // 이미지 미리보기 처리
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // 제품 등록/수정 다이얼로그 열기
    const handleOpen = (product = null) => {
        if (product) {
            setFormData({
                productId: product.productId,
                productName: product.productName,
                description: product.description,
                price: product.price,
                image: null
            });
            setPreviewUrl(product.imageUrl || '');
        } else {
            setFormData({
                productId: '',
                productName: '',
                description: '',
                price: '',
                image: null
            });
            setPreviewUrl('');
        }
        setOpen(true);
    };

    // 제품 저장
    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            if (formData.productId) {
                // 수정
                await axios.put(`/api/product/${formData.productId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // 등록
                await axios.post('/api/product', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            fetchProducts();
            setOpen(false);
        } catch (error) {
            console.error('제품 저장 실패:', error);
            alert('제품 저장에 실패했습니다.');
        }
    };

    // 제품 삭제
    const handleDelete = async (productId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/product/${productId}`);
                fetchProducts();
            } catch (error) {
                console.error('제품 삭제 실패:', error);
                alert('제품 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>제품 관리</Typography>
                
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                    >
                        제품 등록
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width="100">이미지</TableCell>
                                <TableCell>제품명</TableCell>
                                <TableCell>설명</TableCell>
                                <TableCell width="120">가격</TableCell>
                                <TableCell width="120" align="center">관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.productId}>
                                    <TableCell>
                                        <img
                                            src={product.imageUrl || '/default-product.png'}
                                            alt={product.productName}
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price.toLocaleString()}원</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleOpen(product)}
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(product.productId)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* 등록/수정 다이얼로그 */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        {formData.productId ? '제품 수정' : '제품 등록'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <img
                                    src={previewUrl || '/default-product.png'}
                                    alt="제품 이미지"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    이미지 선택
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </Box>
                            <TextField
                                label="제품명"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="설명"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                multiline
                                rows={3}
                                fullWidth
                            />
                            <TextField
                                label="가격"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                fullWidth
                                InputProps={{
                                    endAdornment: <span>원</span>
                                }}
                            />
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

export default ProductManagementPage;
