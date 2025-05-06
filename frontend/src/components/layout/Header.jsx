import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>ERP 시스템</h1>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">로그인</Link>
          <Link to="/register" className="auth-button">회원가입</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 