import React, {useState, useEffect} from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'USER',
        isActive: true,
        storeId: null,
    });

    useEffect(() => {
        fetchUsers();
        fetchStores();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('사용자 목록을 불러오는데 실패했습니다:', error);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await axios.get('/api/stores');
            setStores(response.data);
        } catch (error) {
            console.error('매장 목록을 불러오는데 실패했습니다:', error);
        }
    };

    const handleOpen = (user = null) => {
        if (user) {
            setSelectedUser(user);
            setFormData(user);
        } else {
            setSelectedUser(null);
            setFormData({
                username: '',
                email: '',
                role: 'USER',
                isActive: true,
                storeId: null,
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                await axios.put(`/api/users/${selectedUser.userId}`, formData);
            } else {
                await axios.post('/api/users', formData);
            }
            fetchUsers();
            handleClose();
        } catch (error) {
            console.error('사용자 정보 저장에 실패했습니다:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('사용자 삭제에 실패했습니다:', error);
            }
        }
    };

    return (
        <Box sx={{p: 3}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
                <Typography variant="h4">사용자 관리</Typography>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>고유 ID</TableCell>
                            <TableCell>사용자명</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>권한</TableCell>
                            <TableCell>매장</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role === 'ROLE_ADMIN' ? '관리자' :
                                    user.role === 'ROLE_MANAGER' ? '매니저' :
                                        user.role === 'ROLE_STORE' ? '매장' : '알 수 없음'}
                                </TableCell>
                                <TableCell>
                                    {stores.find(store => store.storeId === user.storeId)?.storeName || '-'}
                                </TableCell>
                                <TableCell>{user.isActive ? '활성' : '비활성'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(user)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.userId)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedUser ? '사용자 정보 수정' : '새 사용자 추가'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{mt: 2}}>
                        <TextField
                            fullWidth
                            label="사용자명"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="이메일"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>권한</InputLabel>
                            <Select
                                value={formData.role}
                                label="권한"
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                            >
                                <MenuItem value="ROLE_ADMIN">관리자</MenuItem>
                                <MenuItem value="ROLE_MANAGER">매니저</MenuItem>
                                <MenuItem value="ROLE_STORE">일반 사용자</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>매장</InputLabel>
                            <Select
                                value={formData.storeId || ''}
                                label="매장"
                                onChange={(e) => setFormData({...formData, storeId: e.target.value})}
                            >
                                <MenuItem value="">선택 안함</MenuItem>
                                {stores.map((store) => (
                                    <MenuItem key={store.storeId} value={store.storeId}>
                                        {store.storeName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>상태</InputLabel>
                            <Select
                                value={formData.isActive}
                                label="상태"
                                onChange={(e) => setFormData({...formData, isActive: e.target.value})}
                            >
                                <MenuItem value={true}>활성</MenuItem>
                                <MenuItem value={false}>비활성</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserManagementPage; 