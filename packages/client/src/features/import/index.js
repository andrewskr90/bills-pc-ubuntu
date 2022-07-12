import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BillsPcService from '../../api/bills-pc'
import ImportPurchase from './ImportPurchase'

const Import = (props) => {
    const { cardData, setCardData, setCollectedItems } = props

    useEffect(() => {
        BillsPcService.getSets()
            .then(res => {
                setCardData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    
    return (<div className='collectPage page flexColumnCenter'>
        <Routes>
            <Route 
                path='/' 
                element={<ImportPurchase 
                    cardData={cardData}
                    setCardData={setCardData}
                />} 
            />
        </Routes>
    </div>)
}

export default Import
