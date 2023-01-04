import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const isUser= isAuthenticated && user;

  console.log("isAuthenticated",isAuthenticated,user);

  if(!isUser){
    return <Navigate to ="/login" />
  }
  return children;
  // even in login state, we cannot see the dashboard so we used AuthWrapper


};
export default PrivateRoute;
