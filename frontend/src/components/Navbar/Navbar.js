import React, { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { TickerTape } from "react-tradingview-embed"
import Logo from "../../assets/Group 15.svg"
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
import { config } from "./config"
const Navbar = () => {
  const { handleSignout } = useAuth()
  const { setShowLoginModal } = useModal()
  const { user } = useAuth()

  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-dark fixed-top'>
        <div className='container-fluid'>
          <Link id='navbar-title' exact='true' to='/'>
            <img src={Logo} alt='Logo'></img>
          </Link>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarmenu'
            aria-controls='navbarmenu'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'></span>
          </button>
        </div>
        <div id='navbarmenu' className='collapse navbar-collapse'>
          {user ? (
            <ul className='navbar-nav me-auto'>
              <NavLink className='nav-link' activeClassName='active' exact={true} to='/'>
                <i className='bi bi-house-fill'></i> <span>Home</span>
              </NavLink>
              <NavLink className='nav-link' activeClassName='active' to='/events'>
                <i className='bi bi-calendar3'></i> <span>Events</span>
              </NavLink>
              <NavLink className='nav-link' activeClassName='active' to='/charts'>
                <i class='bi bi-bar-chart'></i>
                <span>Charts</span>
              </NavLink>
              <div class='dropdown dropcenter'>
                <button
                  class='dropdown-toggle btn  text-white'
                  id='navbarDarkDropdownMenuLink'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <i className='bi bi-person'></i>
                </button>
                <ul
                  class='dropdown-menu dropdown-menu-dark '
                  aria-labelledby='navbarDarkDropdownMenuLink'>
                  <li>
                    <NavLink className='nav-link' activeClassName='active' to='/account'>
                      <span>Account</span>
                    </NavLink>
                  </li>
                  <li>
                    <hr class='dropdown-divider'></hr>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleSignout}
                      className='nav-link'
                      activeClassName=''
                      to='/'>
                      <i className='bi bi-arrow-bar-right'></i> <span>Sign out</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </ul>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <ul className='navbar-nav'>
              <NavLink className='nav-link' activeClassName='active' exact={true} to='/'>
                <i className='bi bi-house-fill'></i> <span>Home</span>
              </NavLink>
              <NavLink className='nav-link' activeClassName='active' to='/events'>
                <i className='bi bi-calendar3'></i> <span>Events</span>
              </NavLink>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className='nav-link'
                onClick={() => {
                  setShowLoginModal(true)
                }}>
                <i className='bi bi-door-open'></i>
                <span>Log in</span>
              </a>
            </ul>
          )}
        </div>
      </nav>
      <div className='mt-5 tv-widget-tape'>
        <TickerTape widgetProps={config} />
      </div>
    </>
  )
}

export default Navbar
