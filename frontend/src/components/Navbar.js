import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({ handleSignout }) => {
  return (
    <nav className='navbar'>
      <Link id='navbar-title' exact='true' to='/'></Link>
      <div>
        <Link className='nav-link' exact='true' to='/'>
          Home
        </Link>
        <Link className='nav-link' to='/favourites'>
          My favourites
        </Link>
        <Link onClick={handleSignout} className='nav-link' to={() => false}>
          Sign out
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
