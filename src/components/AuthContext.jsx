import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // new

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      const decoded = jwt_decode(token);
      setAdmin(decoded);
    }
    setLoading(false); // auth check done
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

