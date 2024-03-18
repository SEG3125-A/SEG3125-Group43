/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

// When a user is trying to access a dashboard or other private pages 
// when they aren't logged in yet, they should be redirected to the
// log in page

interface PrivateRouteProps {
    children : React.ReactElement;
}
const PrivateRoute : FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useAuth();
    if ( !user ) {
        return (
            <Navigate to="/login" replace ={true} />
          )
    }
    return children;
}

export default PrivateRoute