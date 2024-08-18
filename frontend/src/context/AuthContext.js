import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check local storage for authentication status and email
    const authStatus = window.localStorage.getItem('isAuthenticated');
    const email = window.localStorage.getItem('userEmail');
    
    if (authStatus === 'true' && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      setIsAuthenticated(false);
      setUserEmail(null);
    }

    
    
    //console.log('Auth status after useEffect:', isAuthenticated);
    //console.log('User email after useEffect:', userEmail);
  }, [isAuthenticated, userEmail]);

  const login = (email) => {
    //console.log('Login function called with email:', email);
    setIsAuthenticated(true);
    setUserEmail(email);
    window.localStorage.setItem('isAuthenticated', 'true');
    window.localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    //console.log('Logout function called');
    setIsAuthenticated(false);
    setUserEmail(null);
    window.localStorage.removeItem('isAuthenticated');
    window.localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
