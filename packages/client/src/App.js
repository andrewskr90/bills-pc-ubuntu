import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import LoginPage from './components/common/LoginPage'
import TrainerApp from './components/trainer/TrainerApp'
import GymLeaderHome from './components/gymLeader/GymLeaderHome'
import GymLeaderRoute from './utils/auth/GymLeaderRoute'

import './styles/App.css'
import BillsPcService from './api/bills-pc'

//calling api before app renders can lead to bugs
//render app first, call data in useEffect,
//then set initialData to true
let initialData = false

const App = (props) => {
    const [userClaims, setUserClaims] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            await BillsPcService.authenticateSession()
                .then(res =>  {
                    initialData = true
                    setUserClaims(res.data)
                }).catch(err => {
                    initialData = true
                    navigate('/login')
                })
        }
        checkAuth()
    }, [])

    return (<div className='app'>
        {initialData
        ?
        <Routes>
            <Route path='/login' element={<LoginPage setUserClaims={setUserClaims} />} />
            <Route path='/*' element={<TrainerApp userClaims={userClaims} />} />
            {/* Gym Leader protected routes */}
            <Route element={<GymLeaderRoute userClaims={userClaims} />} >
                <Route path='/gym-leader/*' element={<GymLeaderHome userClaims={userClaims} />} />
            </Route>
        </Routes>
        :
        <h2>Loading...</h2>}
    </div>)
}

export default App
