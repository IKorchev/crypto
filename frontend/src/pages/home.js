import React, { useRef } from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"

import News from "./news"
import { useModal } from "../contexts/ModalContext"

const Home = () => {
  const headerRef = useRef(null)
  const { setShowRegisterModal } = useModal()

  return (
    <div>
      <div id='landing-page'>
        <div id='header' ref={headerRef}>
          <h1>
            <img src={CryptoInfo} width='390px' alt='CryptoInfo header'></img>
          </h1>
          <div>
            <h5>
              News and updates on cryptocurrencies. Get real-time price data. Save
              favorites and more.
            </h5>
          </div>
          <div>
            <button onClick={() => setShowRegisterModal(true)}>Register</button>
          </div>
        </div>

        <img src={HeaderImage} alt='Header background' id='header-image'></img>
      </div>
      <News />
    </div>
  )
}

export default React.forwardRef(Home)
