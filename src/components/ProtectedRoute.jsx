import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
