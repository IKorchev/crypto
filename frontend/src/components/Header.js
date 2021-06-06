import React from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"

const Header = (props, forwardedRef) => {
  const handleModal = (ref) => {
    ref.classList.remove("fade-out")
    ref.classList.remove("display-none")
    ref.classList.add("fade-in")
  }

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
            handleModal(forwardedRef.current)
          }}>
          Log in
        </button>
      </div>
      <img src={HeaderImage} alt='Header background' id='header-image'></img>
    </div>
  )
}

export default React.forwardRef(Header)
