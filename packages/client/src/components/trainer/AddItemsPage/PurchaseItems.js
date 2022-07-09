import React, { useState } from 'react'
import AddItemModal from './AddItemModal'

const PurchaseItems = (props) => {
    const [addItemModal, setAddItemModal] = useState(false)
    const { 
        handleAddCardToPurchase, 
        handleRemoveCardFromPurchase,
        purchaseFormValues, 
        cardData, 
        setCardData 
    } = props

    

    return (<div className='purchaseItems'>
        <h3>Insert into Collection</h3>
        <div className='itemList'>
            {purchaseFormValues.cards.map(card => {
                const { card_id, card_name, card_image_small } = card
                return <div key ={card_id} className='item'>
                    <p>{card_name}</p>
                    <img src={card_image_small} />
                    <button id={card_id} onClick={handleRemoveCardFromPurchase}>X</button>
                </div>
            })}
        </div>
        <button onClick={() => setAddItemModal(true)}>Add item</button>
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

export default PurchaseItems
