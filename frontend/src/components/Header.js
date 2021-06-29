import React, { useRef, useEffect } from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"
import gsap from "gsap"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useAuth } from "../contexts/AuthContext"
const Header = () => {
  const formRef = useRef(null)
  const { uiConfig, auth } = useAuth()
  return (
    <div id='landing-page'>
      <div
        id='form-wrapper'
        ref={formRef}
        onClick={(e) => {
          e.target === formRef.current &&
            gsap.to(formRef.current, { opacity: 0, zIndex: "-1000" })
        }}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>

      <div id='header'>
        <h1>
          <img src={CryptoInfo} width='390px' alt='CryptoInfo header'></img>
        </h1>
        <p>Get automated text notifications about your favourite cryptocurrency.</p>
        <button
          onClick={(e) => {
            console.log(formRef.current)
            gsap.to(formRef.current, {
              opacity: 1,
              zIndex: 999,
            })
          }}>
          Log in
        </button>
      </div>
      <img src={HeaderImage} alt='Header background' id='header-image'></img>
    </div>
  )
}

export default React.forwardRef(Header)
