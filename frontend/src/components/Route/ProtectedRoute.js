import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated, loading } = useSelector(state => state.user);
    if (loading === undefined || loading === true)
        return <></>;
    return isAuthenticated === true ? <Component /> : <Navigate to='/login'/>;
}

export default ProtectedRoute;
