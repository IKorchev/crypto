import React, { createRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Navbar = ({ handleSignout }) => {
  const [toggled, setToggled] = useState(false)
  const [width, setWidth] = useState()

  useEffect(() => {
    // make sure when resized navbar is toggled off
    const handleResize = () => {
      setWidth(window.innerWidth)
      console.log(width)
    }
    if (width > 992 && toggled === true) {
      setToggled(!toggled)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [toggled, width])

  const handleClick = (e) => {
    e.preventDefault()
    if (width < 992 && toggled) {
      setToggled(false)
    }
  }

  return (
    <nav className='navbar'>
      <Link id='navbar-title' exact='true' to='/'></Link>
      <div>
        <button aria-controls='' id='menu-toggler' onClick={() => setToggled(true)}>
          <i className={`bi bi-${toggled ? "x" : "list"}`}></i>
        </button>
        <div id='nav-links-container' className={`${toggled ? "toggle" : ""}`}>
          <Link className='nav-link' onClick={handleClick} exact='true' to='/'>
            Home
          </Link>
          <Link className='nav-link' onClick={handleClick} to='/favourites'>
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
