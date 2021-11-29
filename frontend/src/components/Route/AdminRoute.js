import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const AdminRoute = ({ component: Component }) => {
    const { loading, user, isAuthenticated } = useSelector(state => state.user);
    if (loading === undefined || loading === true)
        return <></>;
    if (isAuthenticated === false || (user.role !== 'admin')) 
        return <Navigate to='/login'/>;
    
    return (
        <Component />
    )
}

export default AdminRoute;
