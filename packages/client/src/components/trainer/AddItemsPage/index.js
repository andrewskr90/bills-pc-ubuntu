import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BillsPcService from '../../../api/bills-pc'
import PurchaseItems from './PurchaseItems'
import PurchaseDetails from './PurchaseDetails'

const initialPurchaseFormValues = {
    date: '',
    vendor: '',
    cards: [],
    products: [],
    subtotal: 0,
    discount: 0,
    taxRate:0,
    taxAmount: 0,
    total: 0,
    amountPaid: 0
}

const AddItemsPage = (props) => {
    const { cardData, setCardData, setCollectedItems } = props
    const [purchaseFormValues, setPurchaseFormValues] = useState(initialPurchaseFormValues)

    const handleAddCardToPurchase = (card) => {
        setPurchaseFormValues({
            ...purchaseFormValues,
            cards: [
                ...purchaseFormValues.cards,
                card
            ]
        })
    }

    const handleRemoveCardFromPurchase = (e) => {
        const id = parseInt(e.target.id)
        const filteredArray = purchaseFormValues.cards.filter(card => {
            if (id === card.card_id) {
                return false
            } else {
                return true
            }
        })
        setPurchaseFormValues({
            ...purchaseFormValues,
            cards: filteredArray
        })
    }

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
                element={<PurchaseItems 
                    cardData={cardData}
                    setCardData={setCardData}
                    handleAddCardToPurchase={handleAddCardToPurchase} 
                    handleRemoveCardFromPurchase={handleRemoveCardFromPurchase}
                    purchaseFormValues={purchaseFormValues}
                />} 
            />
            <Route 
                path='/details' 
                element={<PurchaseDetails 
                    purchaseFormValues={purchaseFormValues} 
                />}
            />
        </Routes>
    </div>)
}

export default AddItemsPage
