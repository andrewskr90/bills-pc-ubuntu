import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import TrainerHome from './TrainerHome'
import CollectPage from './CollectPage'

const TrainerApp = (props) => {
    const { userClaims } = props
    const [collectedItems, setCollectedItems] = useState([])

    useEffect(() => {

    }, [])

    return (<div className='trainerApp'>
        <Routes>
            <Route path='/' element={<TrainerHome collectedItems={collectedItems} />} />
            <Route path='/collect' element={<CollectPage setCollectedItems={setCollectedItems} />} />
            <Route path='/rip' element={<p>rip products from collection</p>} />
            <Route path='/profile' element={<p>user profile</p>} />
        </Routes>
        
        <NavBar />
    </div>)
}

export default TrainerApp
