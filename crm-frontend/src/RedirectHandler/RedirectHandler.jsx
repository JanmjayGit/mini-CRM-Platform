import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTo = sessionStorage.getItem('redirectUrl') || '/dashboard';
    sessionStorage.removeItem('redirectUrl');
    navigate(redirectTo);
  }, [navigate]);

  return null;
};

export default RedirectHandler;