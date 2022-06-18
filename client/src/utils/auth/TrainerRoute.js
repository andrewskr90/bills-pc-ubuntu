import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const TrainerRoute = (props) => {
    const { userClaims } = props
    if (userClaims.user_role === 'Trainer' || userClaims.user_role === 'Gym-Leader') {
        console.log(userClaims)
        return <Outlet />
    } else {
        <Navigate to='/login' />
    }
}

// const GymLeaderRoute = ({component:Component, ...rest})=> {
//     return <Route {...rest} render={(props) => {
//         if (localStorage.getItem("token")) {
//             return <Component {...props} />
//         } else {
//             return <Redirect to="/" />
//         }
//     }}/>
// }

export default TrainerRoute
