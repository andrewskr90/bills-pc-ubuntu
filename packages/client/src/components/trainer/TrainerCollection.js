import React from 'react'
import { Link } from 'react-router-dom'

const TrainerCollection = (props) => {
    const { collectedItems } = props
    return (<div className='trainerHome page'>
        {collectedItems.length > 0
        ?
        <div className='collection'>
            
        </div>
        :
        <div className='emptyCollection page flexColumnCenter'>
            <p>No items in your collection!</p>
            <Link className='button' to='/add-items'>Add Items</Link>
        </div>
        }
    </div>)
}

export default TrainerCollection
