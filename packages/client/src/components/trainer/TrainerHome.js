import React from 'react'
import { Link } from 'react-router-dom'

const TrainerHome = (props) => {
    const { collectedItems } = props
    return (<div className='trainerHome page'>
        {collectedItems.length > 0
        ?
        <div className='collection'>
            
        </div>
        :
        <div className='emptyCollection page flexColumnCenter'>
            <p>No items in your collection!</p>
            <Link className='link' to='/collect'>
                <button>Add item</button>
            </Link>
        </div>
        }
    </div>)
}

export default TrainerHome
