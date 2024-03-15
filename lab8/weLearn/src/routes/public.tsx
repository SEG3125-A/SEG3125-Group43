/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

// When a user is trying to access a signup or login page when 
// already logged in, they should be redirected to the home page

interface PublicRouteProps {
    children : React.ReactElement;
}
const PublicRoute : FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuth();
    if ( user ) {
        return (
            <Navigate to="/dashboard" replace ={true} />
          )
    }
    return children;
}

export default PublicRoute