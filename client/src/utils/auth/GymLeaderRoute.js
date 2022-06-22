import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const GymLeaderRoute = (props) => {
    const { user_role } = props.userClaims
    if (user_role === 'GymLeader') {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }
}

export default GymLeaderRoute
