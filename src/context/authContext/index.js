'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { token } from '@/services/auth/token';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  const checkToken = async () => {
    try {
      const { authToken } = await token();
      return authToken.token.value;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem('auth');

      if (data) {
        const parsedData = JSON.parse(data);
        const authTokenValue = await checkToken();

        if (authTokenValue) {
          setAuth({
            user: parsedData.user,
            token: authTokenValue,
          });
        } else {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        }
      }
    };

    fetchData();
  }, []); // Only run on mount

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
