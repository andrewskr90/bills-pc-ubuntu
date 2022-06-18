import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import LoginPage from './components/common/LoginPage'
import TrainerHome from './components/trainer/TrainerHome'
import GymLeaderHome from './components/gymLeader/GymLeaderHome'
import TrainerRoute from './utils/auth/TrainerRoute'
import OnlyUnauthorized from './utils/auth/OnlyUnauthorized'

import './styles/App.css'
import BillsPcService from './api/bills-pc'

const App = (props) => {
    const [userClaims, setUserClaims] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            await BillsPcService.authenticateSession()
                .then(res =>  {
                    setUserClaims(res.data)
                    navigate('/')
                }).catch(err => {
                    navigate('/login')
                })
        }
        checkAuth()
    }, [])
    return (<>
        <Routes>
            <Route path='/login' element={<LoginPage setUserClaims={setUserClaims} />} />
            {/*Trainer protected routes*/}
            <Route path='/' element={<TrainerHome />} />
            {/* Gym Leader protected routes */}
            <Route path='/gym-leader' element={<GymLeaderHome userClaims={userClaims} />} />
        </Routes>
    </>)
}

export default App
