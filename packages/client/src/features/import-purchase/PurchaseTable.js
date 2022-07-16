import React from 'react'

const PurchaseTable = (props) => {
    const { setAddItemModal, removeCardFromPurchase, purchaseValues, updatePurchaseValues } = props

    return (<div className='purchaseTable'>
    <div className='purchaseItemsHeader row'>
        <p className='image'>Item</p>
        <p className='quantity'>Qty</p>
        <p className='retail'>Retail</p>
        <p className='notes'>Notes</p>
        <button onClick={() => setAddItemModal(true)}>+</button>
    </div>
    {purchaseValues.cards.map((card, idx) => {
        const { card_id, quantity, retail, card_image_small } = card
        return <div key ={card_id} className='row'>
            <div className='image'>
                <img src={card_image_small} />
            </div>
            <input 
                id={idx}
                className='quantity'
                type='number'
                min='1'
                step='1'
                name='quantity'
                value={purchaseValues.cards[idx].quantity}
                onChange={updatePurchaseValues}
            />
            <input 
                id={idx}
                className='retail'
                type='number'
                min='0'
                step='.01'
                name='retail'
                value={purchaseValues.cards[idx].retail}
                onChange={updatePurchaseValues}
            />
            <input 
                id={idx}
                className='notes'
                type='text'
                name='cardNotes'
                value={purchaseValues.cards[idx].cardNotes}
                onChange={updatePurchaseValues}
            />
            <button id={card_id} onClick={removeCardFromPurchase}>x</button>
        </div>
    })}
</div>)
}

export default PurchaseTable
