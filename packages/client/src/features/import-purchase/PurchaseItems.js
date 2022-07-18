import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PurchaseTable from './PurchaseTable'
import SelectItemModal from './SelectItemModal' 

const PurchaseItems = (props) => {
    const [addItemModal, setAddItemModal] = useState(false)
    const { 
        referenceData, 
        setReferenceData,
        purchaseValues,
        setPurchaseValues,
        updatePurchaseValues 
    } = props
    const navigate = useNavigate()

    const handleSelectCard = (card) => {
        const purchasedCard = {
            ...card,
            quantity: 1,
            retail: 0,
            cardNote: ''
        }
        let itemCount = purchaseValues.itemCount + 1
        setPurchaseValues({
            ...purchaseValues,
            itemCount: itemCount,
            cards: [
                ...purchaseValues.cards,
                purchasedCard
            ]
        })
        setAddItemModal(false)
    }    

    const removeCardFromPurchase = (e) => {
        const id = parseInt(e.target.id)
        const filteredArray = purchaseValues.cards.filter(card => {
            if (id === card.card_id) {
                return false
            } else {
                return true
            }
        })
        setPurchaseValues({
            ...purchaseValues,
            cards: filteredArray
        })
    } 

    return (<div className='purchaseItems'>
        <PurchaseTable 
            setAddItemModal={setAddItemModal}
            removeCardFromPurchase={removeCardFromPurchase}
            purchaseValues={purchaseValues}
            updatePurchaseValues={updatePurchaseValues}
        />
        <button 
            onClick={() => navigate('details')} 
            disabled={purchaseValues.cards.length < 1}
        >Continue
        </button>
        {addItemModal
        ?
        <SelectItemModal 
            addItemModal={addItemModal}
            setAddItemModal={setAddItemModal}
            referenceData={referenceData}
            setReferenceData={setReferenceData}
            handleSelectCard={handleSelectCard}
            purchaseValues={purchaseValues}
        />
        :
        <></>}
    </div>)
}

export default PurchaseItems
