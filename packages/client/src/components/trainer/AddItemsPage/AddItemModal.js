import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BillsPcService from '../../../api/bills-pc'
import SelectCard from './SelectCard'
import SelectionDetails from './SelectionDetails'

const initialAddItemModalState = {
    itemType: 'card',
    cardFilterBy: 'sets',
    cardFilterValue: '',
    productFilterBy: '',
    productFilterValue: '',
    filteredSets: [],
    selectedSetId: '',
    selectedSetIndex: '',
    selectedSetCards: [],
    selectedCardIndex: '',
    selectedCard: {
        card_id: '',
        card_image_small: ''
    },
    selectionRetail: 0,
    selectionQuantity: 1
}

const AddItemModal = (props) => {
    const [addItemModalState, setAddItemModalState] = useState(initialAddItemModalState)
    const { 
        cardData, 
        setCardData, 
        setAddItemModal,
        handleAddCardToPurchase 
    } = props
    const { card_id } = addItemModalState.selectedCard

    const navigate = useNavigate()

    useEffect(() => {
        if (cardData.length < 1) {
            navigate('/add-items')
        }
    }, [])
    
    useEffect(() => {
        //filtering by set
        if (addItemModalState.cardFilterBy === 'sets') {
            let count = 0
            const filteredSets = cardData.filter((set, idx) => {
                const setName = set.set_name.toLowerCase()
                const substring = addItemModalState.cardFilterValue.toLowerCase()
                if (count <= 10 && setName.includes(substring)) {
                    count ++
                    set.cardDataIndex = idx
                    return set
                } else {
                    return false
                }
            })
            setAddItemModalState({
                ...addItemModalState,
                filteredSets: filteredSets
            })
        }
        //other filters 
    }, [addItemModalState.cardFilterValue])

    //update state with selected set cards
    useEffect(() => {
        if (addItemModalState.selectedSetId) {
            const set_index = addItemModalState.selectedSetIndex
            const set_id = addItemModalState.selectedSetId
            console.log(set_index, set_id, cardData[set_index])
            if (cardData[set_index].cards) {
                setAddItemModalState({
                    ...addItemModalState,
                    selectedSetCards: cardData[set_index].cards
                })
            } else {
                BillsPcService.getCardsBySetId(set_id)
                    .then(res => {
                        setAddItemModalState({
                            ...addItemModalState,
                            selectedSetCards: res.data
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }
    }, [addItemModalState.selectedSetId])

    useEffect(() => {
        if (addItemModalState.selectedSetCards.length > 0) {
            const updatedSetCards = cardData.map((set, idx) => {
                if (idx === addItemModalState.selectedSetIndex) {
                    const updatedSet = {
                        ...set,
                        cards: addItemModalState.selectedSetCards
                    }
                    return updatedSet
                } else {
                    return set
                }
            })
            setCardData(updatedSetCards)
        }
    }, [addItemModalState.selectedSetCards])

    const handleSearchFilterChange = (e) => {
        const { name, value } = e.target
        setAddItemModalState({
            ...addItemModalState,
            [name]: value,
            filteredSets: [],
            selectedSetId: '',
            selectedSetIndex: '',
            selectedSetCards: [],
            selectedCardIndex: '',
            selectedCard: {
                card_image_small: ''
            }
        })
    }

    const handleSelectSet = (e) => {
        e.preventDefault()
        const cardDataIndex = parseInt(e.currentTarget.id)
        const set_id = cardData[cardDataIndex].set_id
        setAddItemModalState({
            ...addItemModalState,
            cardFilterValue: '',
            selectedSetId: set_id,
            selectedSetIndex: cardDataIndex
        })
    }

    const handleSelectCard = (e) => {
        e.preventDefault()
        const cardIndex = parseInt(e.currentTarget.id)
        const setIndex = addItemModalState.selectedSetIndex
        const card = cardData[setIndex].cards[cardIndex]
        setAddItemModalState({
            ...addItemModalState,
            selectedCardIndex: cardIndex,
            selectedSetCards: [],
            selectedCard: card
        })
    }

    const handleAddItemToPurchase = (e) => {
        e.preventDefault()
        const { selectedCard, selectionQuantity, selectionRetail } = addItemModalState
        const card = {
            ...selectedCard,
            selectionQuantity,
            selectionRetail
            
        }
        setAddItemModalState({
            ...initialAddItemModalState,
        })
        setAddItemModal(false)
        handleAddCardToPurchase(card)
    }

    return (<div className='modal addItemModal'>
        <div className='modalContent flexColumnSpaceCenter'>
            <div>
                {/* select card or product */}
                <div className='itemTypeButtons'>
                    <button 
                        onClick={() => setAddItemModalState({ ...addItemModalState, itemType: 'card' })} 
                        className={`smallButton addItemModal${addItemModalState.itemType === 'card' ? ' selected':''}`}
                    >
                        Add card
                    </button>
                    <button 
                        onClick={() => setAddItemModalState({ ...addItemModalState, itemType: 'product' })} 
                        className={`smallButton addItemModal${addItemModalState.itemType === 'product' ? ' selected':''}`}
                    >
                        Add product
                    </button>
                </div>

                {/* add card */}
                <SelectCard 
                    addItemModalState={addItemModalState}
                    handleSearchFilterChange={handleSearchFilterChange}
                    handleSelectSet={handleSelectSet}
                    handleSelectCard={handleSelectCard}
                />
                
                {/* add product */}
                <div className={addItemModalState.itemType === 'product' ? 'addProductToTransaction':'hidden'}>
                    <p>Feature Not Available.</p>
                </div>    

                {/* set cost of added item(s) */}
                <SelectionDetails 
                    addItemModalState={addItemModalState} 
                    setAddItemModalState={setAddItemModalState} 
                    handleAddCardToPurchase={handleAddCardToPurchase}
                />
            </div>
            <button className={card_id ? '' : 'hidden'} onClick={handleAddItemToPurchase}>Update Purchase</button>
            <button className='modalClose' onClick={() => setAddItemModal(false)}>X</button>      
        </div>
    </div>
    )
}

export default AddItemModal
