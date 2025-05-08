import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '사용자 관리',
      description: '전체 사용자 계정 관리',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/user-management',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>관리자 메뉴</Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card>
              <CardActionArea onClick={() => navigate(item.path)}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage; 