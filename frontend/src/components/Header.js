import React, { useEffect, useRef } from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"
import gsap from "gsap"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useAuth } from "../contexts/AuthContext"

import News from "./News"
const Header = () => {
  const headerRef = useRef(null)
  const { uiConfig, auth } = useAuth()
  useEffect(() => {
    headerRef.current.focus()
  }, [])
  return (
    <div>
      <div
        class='modal fade'
        id='modal'
        tabindex='-1'
        aria-labelledby='modalLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h2 class='modal-title' id='modalLabel'>
                Log in
              </h2>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div class='modal-body'>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div>
          </div>
        </div>
      </div>
      <div id='landing-page'>
        <div id='header' ref={headerRef}>
          <h1>
            <img src={CryptoInfo} width='390px' alt='CryptoInfo header'></img>
          </h1>
          <p>Get automated text notifications about your favourite cryptocurrency.</p>
          <button data-bs-toggle='modal' data-bs-target='#modal'>
            Log in
          </button>
        </div>

        <img src={HeaderImage} alt='Header background' id='header-image'></img>
      </div>
      <News />
    </div>
  )
}

export default React.forwardRef(Header)
