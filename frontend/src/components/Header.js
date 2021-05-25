import React from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"

const Header = (props, forwardedRef) => {
  
  return (
    <div id='landing-page'>
      <div id='header'>
        <h1>
          <img src={CryptoInfo} width='390px' alt='CryptoInfo header'></img>
        </h1>
        <p>Get automated text notifications about your favourite cryptocurrency.</p>
        <button
          onClick={(e) => {
            e.preventDefault()
            forwardedRef.current.classList.remove("fade-out")
            forwardedRef.current.classList.remove("display-none")
            forwardedRef.current.classList.add("fade-in")
          }}
          onAnimationStart={() => console.log("animation started")}>
          Sign up
        </button>
      </div>
      <img src={HeaderImage} alt='Header background' id='header-image'></img>
    </div>
  )
}

export default React.forwardRef(Header)
