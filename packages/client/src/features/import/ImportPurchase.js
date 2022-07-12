import React, { useState } from 'react'
import AddItemModal from './AddItemModal'

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

const ImportPurchase = (props) => {
    const [purchaseFormValues, setPurchaseFormValues] = useState(initialPurchaseFormValues)
    const [addItemModal, setAddItemModal] = useState(false)
    const { 
        // handleAddCardToPurchase, 
        // handleRemoveCardFromPurchase,
        // purchaseFormValues, 
        cardData, 
        setCardData 
    } = props


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

    const handleImportPurchase = (e) => {
        e.preventDefault()
        console.log('handle purchase')
    }

    return (<div className='importPurchase'>
        <h3>Purchase</h3>
        <div className='itemList'>
            <div className='tableHeader'>
                <p>Item</p>
                <p>Quantity</p>
                <p>Retail Cost</p>
                <button onClick={() => setAddItemModal(true)}>+</button>
            </div>
            {purchaseFormValues.cards.map(card => {
                const { card_id, quantity, retail, card_image_small } = card
                return <div key ={card_id} className='item'>
                    <img src={card_image_small} />
                    <p>1</p>
                    <p>5.00</p>
                    <button id={card_id} onClick={handleRemoveCardFromPurchase}>x</button>
                </div>
            })}
        </div>
        <button onClick={handleImportPurchase}>Import Purchase</button>
        {addItemModal
        ?
        <AddItemModal 
            addItemModal={addItemModal}
            setAddItemModal={setAddItemModal}
            cardData={cardData}
            setCardData={setCardData}
            handleAddCardToPurchase={handleAddCardToPurchase}
            purchaseFormValues={purchaseFormValues}
        />
        :
        <></>}
    </div>)
}

export default ImportPurchase
