import React from 'react';
import { authConfig } from '../config/auth.config';
import './AuthButton.css';

const AuthButton = () => {
  const handleLogin = () => {
    try {
      // Store the current URL to redirect back after authentication
      sessionStorage.setItem('redirectUrl', window.location.pathname);
      
      // Redirect to Spring's OAuth2 authorization endpoint
      window.location.href = authConfig.googleAuthUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      window.location.href = `${authConfig.frontendUrl}${authConfig.loginFailureUrl}?error=true`;
    }
  };

  return (
    <button className="auth-btn" onClick={handleLogin}>
      <img 
        src="https://a.mktgcdn.com/p/-PwOQsJ3DFhmP-ysVNuotfaRuvS5CJnvkxe-xSGj8ZQ/4267x4267.png" 
        alt="Google Logo" 
        className="google-icon"
      />
      Sign in with Google
    </button>
  );
};

export default AuthButton;
