import React, { createRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Navbar = ({ handleSignout }) => {
  const [toggled, setToggled] = useState(false)
  const [width, setWidth] = useState()
  const toggleMenu = () => {
    toggled ? setToggled(false) : setToggled(true)
  }

  useEffect(() => {
    // make sure when resized navbar is toggled off
    const handleResize = () => {
      setWidth(window.innerWidth)
      console.log(width)
    }
    if (width > 992 && toggled === true) {
      toggleMenu()
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })
  return (
    <nav className='navbar'>
      <Link id='navbar-title' exact='true' to='/'></Link>
      <div>
        <button aria-controls='' id='menu-toggler' onClick={toggleMenu}>
          <i className={`bi bi-${toggled ? "x" : "list"}`}></i>
        </button>
        <div id='nav-links-container' className={`${toggled ? "toggle" : ""}`}>
          <Link className='nav-link' onClick={toggleMenu} exact='true' to='/'>
            Home
          </Link>
          <Link className='nav-link' onClick={toggleMenu} to='/favourites'>
            My favourites
          </Link>
          <Link onClick={handleSignout} className='nav-link' to={() => false}>
            Sign out
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
