import React from 'react'

const SelectCard = (props) => {
    const { addItemModalState, handleSearchFilterChange, handleSelectSet, handleSelectCard } = props
    const { 
        itemType,
        cardFilterValue, 
        filteredSets,
        selectedSetCards
    } = addItemModalState

    return (<div className={itemType === 'card' ? 'addCardToTransaction':'hidden'}>
        <label>Filter By</label>
        <div className='cardFilter'>
            <select name='cardFilterBy' id='cardFilterBy'>
                <option value='sets'>Sets</option>
            </select>
            <div className='filterBySets'>
                <input 
                    type='text'
                    name='cardFilterValue'
                    value={cardFilterValue}
                    onChange={handleSearchFilterChange}
                />
                <div className={cardFilterValue ? 'filterResults' : 'hidden'}>
                    {filteredSets.map(set => {
                        return <div 
                            onClick={handleSelectSet} 
                            className='filterResult' 
                            id={set.cardDataIndex} 
                            key={set.cardDataIndex}
                        >
                            <p>{set.set_name}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className={selectedSetCards.length > 0 ? 'selectedSetCardsComponent' : 'hidden'}>
            {selectedSetCards.map((card, idx) => {
                return <img 
                    src={card.card_image_small} 
                    onClick={handleSelectCard} 
                    className='selectedSetCard' 
                    id={idx} 
                    key={card.card_id} 
                />
            })}
        </div>
    </div>)
}

export default SelectCard
