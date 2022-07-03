import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    return (<div className='navBar'>
        <Link className='link' to='/'><button>Home</button></Link>
        <Link className='link' to='/collect'><button>+</button></Link>
        <Link className='link' to='rip'><button>Rip</button></Link>
        <Link className='link' to='profile'><button>Profile</button></Link>
    </div>)
}

export default NavBar;