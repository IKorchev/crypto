import React, { useRef, useState } from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import HeaderImage from "../assets/Group 17.svg"
import { useAuth } from "../contexts/AuthContext"
import { RegisterModal, LoginModal } from "../components/Modals"
import News from "./News"
const Header = () => {
  const headerRef = useRef(null)
  const { uiConfig, auth } = useAuth()
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div>
      <RegisterModal
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />
      <LoginModal
        auth={auth}
        uiConfig={uiConfig}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
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
            <button onClick={() => setShowLoginModal(true)}>Log in</button>
            <a onClick={() => setShowRegisterModal(true)}>Register</a>
          </div>
        </div>

        <img src={HeaderImage} alt='Header background' id='header-image'></img>
      </div>
      <News />
    </div>
  )
}

export default React.forwardRef(Header)
