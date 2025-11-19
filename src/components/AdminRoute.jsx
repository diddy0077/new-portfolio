import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // or a spinner

  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/admin" />; // redirect if not logged in
  }

  return children;
};

export default AdminRoute;
