'use client';
// AuthProvider.js
import { token } from '@/services/auth/token';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem('auth');
      if (data) {
        const parsedData = JSON.parse(data);
        const userToken = await token();
        console.log(userToken.userToken)
        if (userToken.token) {
          setAuth({
            user: parsedData.user,
            token: parsedData.token,
          });
        } else {
          localStorage.removeItem('auth');
        }
      }
    };

    fetchData();
  }, []); 

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
