import React, { useState } from 'react'

const SelectionDetails = (props) => {
    const [freeItem, setFreeItem] = useState(false)
    const [error, setError] = useState('')
    const { 
        addItemModalState, 
        setAddItemModalState, 
        handleAddCardToPurchase 
    } = props
    const { card_image_small, card_id } = addItemModalState.selectedCard

    const toggleFreeItem = () => {
        if (freeItem) {
            setFreeItem(false) 
        } else {
            setFreeItem(true)
        }
    }

    const handlePriceFormValueChange = (e) => {
        let { name, value } = e.target
        setError('')

        setAddItemModalState({
            ...addItemModalState,
            [name]: value
        })
    }

    const handleUpdatePurchase = (e) => {
        e.preventDefault()
        let { selectionRetail, selectionQuantity } = addItemModalState
        if (!selectionRetail || !selectionQuantity) {
            if (selectionRetail !== 0) {
                setError('All fields required.')
                return
            }
        }
        if (isNaN(selectionRetail) || isNaN(selectionQuantity)) {
            setError('Numbers required.')
            return
        }
        if (selectionRetail < 0) {
            setError("Retail price can't be negative")
            return
        }
        if (selectionQuantity < 1) {
            setError("Quantity can't be less than 1.")
            return
        }
        selectionRetail = Math.round(100*selectionRetail) / 100
        selectionQuantity = Math.ceil(selectionQuantity)
        setAddItemModalState({
            ...addItemModalState,
            selectionQuantity: selectionQuantity,
            selectionRetail: selectionRetail
        })
    }

    return (<div className={card_id ? 'selectionDetails' : 'hidden'}>
        <img className='selectedCard' src={card_image_small} />
        <input className='checkbox' type='checkbox' checked={freeItem} onChange={toggleFreeItem} />
        <form 
            className={freeItem ? 'hidden' : 'purchaseDetails'}
            onSubmit={handleUpdatePurchase}
        >
            <div className='labelInput'>
                <label>Retail Price (no tax): </label>
                <input 
                    id='selectionRetail'
                    type='text'
                    name='selectionRetail'
                    value={addItemModalState.selectionRetail}
                    onChange={handlePriceFormValueChange}
                />
            </div>
            <div className='labelInput'>
                <label>Quantity: </label>
                <input 
                    id='selectionQuantity'
                    type='text'
                    name='selectionQuantity'
                    value={addItemModalState.selectionQuantity}
                    onChange={handlePriceFormValueChange}
                />
            </div>
            <p className={error ? 'error' : 'hidden'}>{error}</p>
        </form>
    </div>)
}

export default SelectionDetails
