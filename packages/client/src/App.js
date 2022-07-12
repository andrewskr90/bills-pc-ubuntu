import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import GymLeaderHome from './pages/GymLeaderHome'
import GymLeaderRoute from './utils/auth/GymLeaderRoute'

import BillsPcService from './api/bills-pc'
import './styles/App.less'

//calling api before app renders can lead to bugs
//render app first, call data in useEffect,
//then set initialData to true
let initialData = false

const App = () => {
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

    return (<>
        {initialData
        ?
        <div className='app'>
            <Routes>
                <Route path='/*' element={<Home userClaims={userClaims} />} />
                <Route path='/login' element={<Login setUserClaims={setUserClaims} />} />
                {/* Gym Leader protected routes */}
                <Route element={<GymLeaderRoute userClaims={userClaims} />} >
                    <Route path='/gym-leader/*' element={<GymLeaderHome userClaims={userClaims} />} />
                </Route>
            </Routes>
        </div>
        :
        <h2>Loading...</h2>}
    </>)
}

export default App
