import React, { useState, useEffect } from "react"
import Banner from "./Banner"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
const Navbar = () => {
  const { handleSignout } = useAuth()
  const [toggled, setToggled] = useState(false)
  const [width, setWidth] = useState()
  const { user } = useAuth()
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
    <>
      <nav className='navbar'>
        <Link id='navbar-title' exact='true' to='/'></Link>
        <div>
          <button
            aria-controls='nav-links-container'
            id='menu-toggler'
            onClick={() => setToggled((toggled) => !toggled)}>
            <i className={`bi bi-${toggled ? "x" : "list"}`}></i>
          </button>
          <div id='nav-links-container' className={`${toggled ? "toggle" : ""}`}>
            <span onClick={handleClick}>
              <Link className='nav-link' exact='true' to='/'>
                Home
              </Link>
            </span>
            <span onClick={handleClick}>
              <Link className='nav-link' to='/events'>
                Crypto events
              </Link>
            </span>
            {user ? (
              <Link onClick={handleSignout} className='nav-link' to='/'>
                Sign out
              </Link>
            ) : (
              <Link onClick={handleSignout} className='nav-link' to='/login'>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Banner />
    </>
  )
}

export default Navbar
