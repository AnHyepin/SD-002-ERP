import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <h1>홈페이지</h1>
      <p>환영합니다!</p>
    </HomeContainer>
  );
};

export default HomePage; 