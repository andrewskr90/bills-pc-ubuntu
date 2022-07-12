import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../layouts/NavBar'
import Collection from '../features/collection'
import Import from '../features/import'
import Profile from '../features/profile'

const Home = (props) => {
    const { userClaims } = props
    const [collectedItems, setCollectedItems] = useState([])
    const [cardData, setCardData] = useState([])
    
    return (<div className='home'>
        <header>
            <h1>Kyle's PC</h1>
        </header>
        <Routes>
            <Route path='/' element={<Collection collectedItems={collectedItems} />} />
            <Route 
                path='/import/*' 
                element={<Import 
                    setCollectedItems={setCollectedItems} 
                    cardData={cardData}
                    setCardData={setCardData}
                />} 
            />
            <Route 
                path='/profile' 
                element={<Profile 
                    userClaims={userClaims} 
                />} 
            />
        </Routes>
        <NavBar />
    </div>)
}

export default Home
