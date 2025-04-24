
import { CustomLayout } from 'components';
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    isAuthenticated,
}) => {
    return (
        isAuthenticated ? <CustomLayout><Outlet/></CustomLayout> : <Navigate to="/auth"/>
    );
};


