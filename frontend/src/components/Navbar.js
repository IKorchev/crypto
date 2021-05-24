import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link id='navbar-title' exact='true' to='/'></Link>
      <div>
        <Link className='nav-link' exact='true' to='/'>
          Home
        </Link>
        <Link className='nav-link' to='/about'>
          About
        </Link>
        <Link className='nav-link' to='/signup'>
          Sign up
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
