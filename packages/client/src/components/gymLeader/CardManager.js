import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import PtcgioManager from './PtcgioManager'

const CardManager = () => {

    return (<div className='cardManager'>
        <div className='toolbar'>
            <h2>Card Manager</h2>
            <Link to='ptcgio' className='link'>PTCGIO</Link>
            <Link to='bills-pc' className='link'>Bills PC</Link>
        </div>
        <div className='panel'>
            <Routes>
                <Route path='/ptcgio/*' element={<PtcgioManager />} />
            </Routes>
        </div>
    </div>)
}

export default CardManager
