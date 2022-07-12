import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const [selected, setSelected] = useState()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('/add')) {
            setSelected('addToCollection')
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
            to='/add' 
            className={`link ${selected === 'addToCollection' ? 'selected': ''}`}
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