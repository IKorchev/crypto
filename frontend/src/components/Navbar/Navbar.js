import React, { useState, useEffect } from "react"
import Banner from "./Banner"
import { NavLink, Link } from "react-router-dom"
import Logo from "../../assets/Group 15.svg"
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
const Navbar = () => {
  const { handleSignout } = useAuth()
  const { setShowLoginModal } = useModal()
  const [toggled, setToggled] = useState(false)
  const [width, setWidth] = useState()
  const { user } = useAuth()
  useEffect(() => {
    // make sure when resized navbar is toggled off
    const handleResize = () => {
      setWidth(window.innerWidth)
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
      <nav className='navbar' onBlur={() => setToggled(false)}>
        <Link id='navbar-title' exact='true' to='/'>
          <img src={Logo} alt='Logo'></img>
        </Link>
        <div>
          <button
            aria-controls='nav-links-container'
            id='menu-toggler'
            onClick={() => setToggled((toggled) => !toggled)}>
            <i className={`bi bi-${toggled ? "x" : "list"}`}></i>
          </button>
          <div id='nav-links-container' className={`${toggled ? "toggle" : ""}`}>
            <span onClick={handleClick}>
              <NavLink className='nav-link' activeClassName='active' exact={true} to='/'>
                <i className='bi bi-house-fill'></i> <span>Home</span>
              </NavLink>
            </span>
            <span onClick={handleClick}>
              <NavLink className='nav-link' activeClassName='active' to='/events'>
                <i className='bi bi-calendar3'></i> <span>Events</span>
              </NavLink>
            </span>
            {user ? (
              <>
                <span onClick={handleClick}>
                  <NavLink className='nav-link' activeClassName='active' to='/account'>
                    <i className='bi bi-person'></i> <span>Account</span>
                  </NavLink>
                </span>
                <NavLink
                  onClick={handleSignout}
                  className='nav-link'
                  activeClassName=''
                  to='/'>
                  <i className='bi bi-arrow-bar-right'></i> <span>Sign out</span>
                </NavLink>
              </>
            ) : (
              <span onClick={handleClick} tabIndex='-1'>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className='nav-link'
                  onClick={() => {
                    setShowLoginModal(true)
                  }}>
                  <i className='bi bi-door-open'></i>
                  <span>Log in</span>
                </a>
              </span>
            )}
          </div>
        </div>
      </nav>
      <Banner />
    </>
  )
}

export default Navbar
