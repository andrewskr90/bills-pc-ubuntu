import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const NavBar = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const clickBillsPC = () => {
    naviate('/my-collection')
  }

    return (
      <header className='navBar'>
        <h1
          onClick={clickBillsPC}
        >
          Bill's PC
        </h1>
        <nav>
          
        </nav>
      </header>
    )
}

export default NavBar;