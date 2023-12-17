// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider.js';

const PrivateRoute = ({ element, ...rest }) => {
  const { auth } = useAuth();

  return auth.isAuthenticated ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
