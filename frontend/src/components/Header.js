import React from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"

const Header = (props, forwardedRef) => {
  const handleFormOpen = async (e) => {
    console.log(forwardedRef.current)
    e.preventDefault()
    forwardedRef.current.classList.add("fade-in")
    forwardedRef.current.addEventListener("webkitAnimationStart", (e) => {
      console.log(e)
      forwardedRef.current.classList.remove("display-none")
    })
  }
  return (
    <div id='landing-page'>
      <div id='header'>
        <h1>
          <img src={CryptoInfo} width='390px' alt='CryptoInfo header'></img>
        </h1>
        <p>Get automated text notifications about your favourite cryptocurrency.</p>
        <button onClick={handleFormOpen}>Sign up</button>
      </div>
      <img src={HeaderImage} alt='Header background' id='header-image'></img>
    </div>
  )
}

export default React.forwardRef(Header)
