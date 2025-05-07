import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <Layout>
            <MainRouter />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App; 