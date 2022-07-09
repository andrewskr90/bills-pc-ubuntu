import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const [selected, setSelected] = useState()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('/add-items')) {
            setSelected('add-items')
        } else if (location.pathname.includes('profile')) {
            setSelected('profile')
        } else {
            setSelected('collection')
        }
    }, [location])

    return (<div className='navBar'>
        <Link 
            to='/' 
            className={`link ${selected === 'collection' ? 'selected': ''}`}
        >
            Collection
        </Link>
        <Link 
            to='/add-items' 
            className={`link ${selected === 'add-items' ? 'selected': ''}`}
        >
            Add
        </Link>
        <Link 
            to='/profile' 
            className={`link ${selected === 'profile' ? 'selected': ''}`}
        >
            Profile
        </Link>
    </div>)
}

export default NavBar;