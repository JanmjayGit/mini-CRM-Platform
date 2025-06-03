import React, { useState } from 'react';
import AuthButton from '../components/AuthButton';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1>Welcome to Mini CRM</h1>
      {!user && <AuthButton onSuccess={onLoginSuccess} />}
    </div>
  );
};

export default Login;

