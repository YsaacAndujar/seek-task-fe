import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

interface OnlyPublicRouteProps {
    isAuthenticated: boolean;
}
export const OnlyPublicRoute: React.FC<OnlyPublicRouteProps> = ({
    isAuthenticated,
}) => {

    return (
        !isAuthenticated ? 
            <Outlet/>
        : <Navigate to="/"/>
    )
}