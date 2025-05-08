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
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';

function Store2() {
    //상태 선언
    const regionCodes = ['부산', '서울', '경남'];
    const stores = ['뭉뭉이', '상구', '뭉댕'];
    // const [stores, setStores] = useState([]);
    // const [regionCodes, setRegionCodes] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedStore, setSelectedStroe] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [formData, setFormData] = useState({
        storeName: '',
        location: '',
        contact: '',
        managerName: '',
        createdAt: '',
    });

    return (
        <Container maxWidth={"lg"}>
            <Box sx={{my: 4}}>
                {/*    제목, 등록 버튼 */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                    <Typography variant="h4" component="h1">
                        매장 관리
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={() => handelOpen()}
                    >
                        매장 등록
                    </Button>
                </Box>

                {/*지역필터*/}
                <Box>
                    <TextField
                        select
                        label={"연습용"}
                        value={selectedRegion}
                        sx={{minWidth: 200}}
                    >
                        <MenuItem value="">전체</MenuItem>
                        {regionCodes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                {/*매장 목록 테이블*/}
                <TableContainer component={Paper}>
                    <table>
                        <TableHead>
                            <tableRow>
                                <TableCell>매장명</TableCell>
                                <TableCell>주소</TableCell>
                                <TableCell>전화번호</TableCell>
                                <TableCell>생성일</TableCell>
                                <TableCell align="center">관리</TableCell>
                            </tableRow>
                        </TableHead>
                        <TableBody>
                            {stores.map((option) => (
                                <TableRow key={option}>
                                    <TableCell>{option}</TableCell>
                                    <TableCell align={"center"}>
                                        <button variant="outlined" size="small" sx={{mr: 1}}>수정</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </table>
                </TableContainer>



            </Box>
        </Container>
    );
}

export default Store2;