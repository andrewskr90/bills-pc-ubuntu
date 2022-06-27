import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BillsPcService from '../../api/bills-pc'
import PtcgioService from '../../api/pokemon-tcg-io'
import { formatCardsArray, formatSetsArray } from '../../utils/format-data/pokemon-tcg-io'
import SetsToolbar from './SetsToolbar'
import CardsToolbar from './CardsToolbar'
import Sets from './Sets'
import Cards from './Cards'

const initialFilterFormValues = {
    setSubstring: ''
}

const PtcgioManager = () => {
    const [ptcgioSets, setPtcgioSets] = useState([])
    const [currentSetCards, setCurrentSetCards] = useState([])
    const [filteredSets, setFilteredSets] = useState([])
    const [filterFormValues, setFilterFormValues] = useState(initialFilterFormValues)
    const [currentSetObject, setCurrentSetObject] = useState(false)

    useEffect(() => {
        PtcgioService.getSets()
            .then(res => {
                setPtcgioSets(res.data.data)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        setFilteredSets(ptcgioSets)
    },[ptcgioSets])

    const handlePostSetsToSets = () => {
        //pokemonapi.io data formatted, and posted to billspc api
        const formattedSets = formatSetsArray(ptcgioSets)
        const sets = formattedSets
        BillsPcService.postSetsToSets(sets)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.message))
    }

    const handlePostCardsToCards = () => {
        const formattedCardsArray = formatCardsArray(currentSetCards)
        console.log(formattedCardsArray)
        BillsPcService.postCardsToCards(ptcgioSets)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (<div className='ptcgioManager'>
        <Routes>
            <Route path='/' element={
                <SetsToolbar 
                    ptcgioSets={ptcgioSets}
                    setFilteredSets={setFilteredSets}
                    filterFormValues={filterFormValues}
                    setFilterFormValues={setFilterFormValues}
                    handlePostSetsToSets={handlePostSetsToSets}
                />
            } />
            <Route path='/:setId' element={
                <CardsToolbar 
                    handlePostCardsToCards={handlePostCardsToCards} 
                    currentSetObject={currentSetObject} 
                />
            } />
        </Routes>
        <div className='panel'>
            <Routes>
                <Route path='/' element={<Sets filteredSets={filteredSets} setCurrentSetCards={setCurrentSetCards} />} />
                <Route path='/:setId/*' element={
                    <Cards 
                        currentSetCards={currentSetCards}
                        setCurrentSetCards={setCurrentSetCards}
                    />
                } />
            </Routes>
        </div>
    </div>)
}

export default PtcgioManager
