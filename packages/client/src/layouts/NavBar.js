import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const [selected, setSelected] = useState()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('/import')) {
            setSelected('import')
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
            to='/import' 
            className={`link ${selected === 'import' ? 'selected': ''}`}
        >
            Import
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