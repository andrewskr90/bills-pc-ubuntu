import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import BillsPcService from '../../../api/bills-pc'
import AddPurchase from './AddPurchase'
import PurchaseDetails from './PurchaseDetails'

const AddToCollection = (props) => {
    const { cardData, setCardData, setCollectedItems } = props

    useEffect(() => {
        BillsPcService.getSets()
            .then(res => {
                setCardData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    
    return (<div className='collectPage page flexColumnNullCenter'>
        <Routes>
            <Route
                path='/'
                element={<>
                    <h3>Add To Collection</h3>
                    <Link className='button' to='purchase'>Add Purchase</Link>
                </>} 
            />
            <Route 
                path='/purchase/*' 
                element={<AddPurchase 
                    cardData={cardData}
                    setCardData={setCardData}
                />} 
            />
        </Routes>
    </div>)
}

export default AddToCollection
