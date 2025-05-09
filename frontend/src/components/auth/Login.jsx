import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {

      const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
        withCredentials: true
      });
      if (response.data) {
        alert('로그인 성공!');
        navigate('/');
      }
    } catch (error) {
      alert('로그인 실패: ' + (error.response?.data?.message || '알 수 없는 오류가 발생했습니다.'));
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-box">
        <Link to="/" className="register-close-button">×</Link>

        <div className="login-logo">
          <img className="login-logo" src="/bread.png" alt="로고" />
          <img className="login-logo" src="/bread.png" alt="로고" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="아이디"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button className="login-submit-button" type="submit">로그인</button>
        </form>

        <div className="login-links">
          <Link to="/find-id">아이디 찾기</Link>
          <Link to="/register">회원가입</Link>
          <Link to="/find-password">비밀번호 찾기</Link>
        </div>


      </div>
    </div>
  );
};

export default Login; 