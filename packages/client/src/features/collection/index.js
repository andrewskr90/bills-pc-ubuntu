import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Collection = (props) => {
    const { collectedItems } = props

    useEffect(() => {
        console.log('hereeeee')
    }, [])
    
    return (<div className='trainerHome page'>
        {collectedItems.length > 0
        ?
        <div className='collection'>
            
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
