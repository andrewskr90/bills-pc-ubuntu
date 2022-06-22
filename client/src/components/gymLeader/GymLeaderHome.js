import React, { useEffect } from 'react'
import CardUploader from './CardUploader'

const GymLeaderHome = () => {
    return (
        <div className='gymLeaderHome'>
            <header className='gymLeaderHeader'>
                <h2>Gym Leader Admin</h2>
                <nav>
                    <a href='/'>Trainer Site</a>
                </nav>
            </header>
            <CardUploader/>
        </div>
    )
}

export default GymLeaderHome
