import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <MainRouter />
      </Layout>
    </Router>
  );
}

export default App; 