import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 서버에 로그인 상태 확인 요청
  useEffect(() => {
    fetch('http://localhost:8000/api/auth/check-login', {
      credentials: 'include', // JWT 쿠키 포함
    })
      .then(res => {
        console.log('✅ 로그인 상태:', res.ok);
        setIsLoggedIn(res.ok);
      })
      .catch(err => {
        console.error('❌ 로그인 체크 실패:', err);
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    }).then(() => {
      setIsLoggedIn(false);
      window.location.href = '/'; // 새로고침으로 반영
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-home-button">ERP 시스템</Link>
        </h1>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-button">로그아웃</button>
          ) : (
            <>
              <Link to="/login" className="auth-button">로그인</Link>
              <Link to="/register" className="auth-button">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
