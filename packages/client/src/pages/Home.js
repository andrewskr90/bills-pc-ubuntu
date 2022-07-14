import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BillsPcService from '../api/bills-pc'
import NavBar from '../layouts/NavBar'
import Collection from '../features/collection'
import ImportPurchase from '../features/import-purchase/index.js'
import Profile from '../features/profile'

const initialReferenceDataValues = {
    sets: [],
    cards: [],
    products: []
}

const Home = (props) => {
    const { userClaims } = props
    const [collectedItems, setCollectedItems] = useState([])
    const [referenceData, setReferenceData] = useState(initialReferenceDataValues)

    useEffect(() => {
        BillsPcService.getSets()
            .then(res => {
                setReferenceData({
                    ...referenceData,
                    sets: res.data
                })
            }).catch(err => {
                console.log(err)
            })
    }, [])
    
    return (<div className='home'>
        <header>
            <h1>Kyle's PC</h1>
        </header>
        <Routes>
            <Route path='/' element={<Collection collectedItems={collectedItems} />} />
            <Route 
                path='/import/*' 
                element={<ImportPurchase 
                    setCollectedItems={setCollectedItems} 
                    referenceData={referenceData}
                    setReferenceData={setReferenceData}
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
