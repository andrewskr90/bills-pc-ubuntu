import React from 'react'
import { Link } from 'react-router-dom'
import CollectedCard from './CollectedCard'
import './assets/collection.less'

const Collection = (props) => {
    const { collectedCards } = props
    
    return (<div className='collection'>
        {collectedCards.length > 0
        ?
        
        <div className='collectedCardsSection'>
            <h3>Collected Cards</h3>
            <div className='collectedCards'>
                {collectedCards.map(collectedCard => {
                    return <CollectedCard collectedCard={collectedCard} />
                })}
            </div>
        </div>
        :
        <div className='emptyCollection page flexColumnCenter'>
            <p>No items in your collection!</p>
            <Link to='/import'>
                <button>Add Items</button>
            </Link>
        </div>
        }
    </div>)
}

export default Collection
