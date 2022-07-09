import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import TrainerCollection from './TrainerCollection'
import AddItemsPage from './AddItemsPage'
import TrainerProfilePage from './TrainerProfilePage'

const TrainerApp = (props) => {
    const { userClaims } = props
    const [collectedItems, setCollectedItems] = useState([])
    const [cardData, setCardData] = useState([])

    return (<div className='trainerApp'>
        <header>
            <h1>Kyle's PC</h1>
        </header>
        <Routes>
            <Route path='/' element={<TrainerCollection collectedItems={collectedItems} />} />
            <Route 
                path='/add-items/*' 
                element={<AddItemsPage 
                    setCollectedItems={setCollectedItems} 
                    cardData={cardData}
                    setCardData={setCardData}
                />} 
            />
            <Route 
                path='/profile' 
                element={<TrainerProfilePage 
                    userClaims={userClaims} 
                />} 
            />
        </Routes>
        <NavBar />
    </div>)
}

export default TrainerApp
