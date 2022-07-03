import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import TrainerHome from './TrainerHome'

const TrainerApp = (props) => {
    const { userClaims } = props
    const [collectedItems, setCollectedItems] = useState([])

    useEffect(() => {

    }, [])

    return (<div className='trainerHome'>
        <Routes>
            <Route path='/' element={<TrainerHome userClaims={userClaims} />} />
            <Route path='/add' element={<p>add items to collection</p>} />
            <Route path='/rip' element={<p>rip products from collection</p>} />
            <Route path='/profile' element={<p>user profile</p>} />
        </Routes>
        
        <NavBar />
    </div>)
}

export default TrainerApp
