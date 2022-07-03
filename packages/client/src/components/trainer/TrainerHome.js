import React from 'react'
import { Link } from 'react-router-dom'

const TrainerHome = (props) => {
    const { collectedItems } = props
    return (<div className='trainerHome'>
        {collectedItems.length > 0
        ?
        <div>

        </div>
        :
        <div className='emptyCollection'>
            <p>No items in your collection!</p>
            <Link className='link' to='/add'><button>Add item</button></Link>
        </div>
        }
    </div>)
}

export default TrainerHome
