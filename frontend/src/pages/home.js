import React, { useRef, useEffect } from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import LandingPageCards from "../components/LandingPageCards"
import { useModal } from "../contexts/ModalContext"
import gsap from "gsap"
import { Power1 } from "gsap"
import { ScrollToPlugin } from "gsap/all"
import { useStore } from "../contexts/StoreContext"
import { Spinner } from "react-bootstrap"
gsap.registerPlugin(ScrollToPlugin)
const Home = () => {
  const headerRef = useRef(null)
  const { setShowRegisterModal } = useModal()
  const scrollDown = () => {
    gsap.to(window, { duration: 1, scrollTo: ".landing-page-cards-wrapper" })
  }
  useEffect(() => {
    gsap.from(headerRef.current.children, {
      opacity: 0,
      stagger: 0.2,
      ease: Power1.easeIn,
    })
  }, [])

  return (
    <div>
      <div id='landing-page'>
        <div id='header' ref={headerRef}>
          <h1>
            <img src={CryptoInfo} alt='CryptoInfo header'></img>
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
        <div className='scroll-btn-div'>
          <button className='scroll-btn' onClick={() => scrollDown()}>
            <span>Scroll down</span>
          </button>
        </div>
      </div>
      <LandingPageCards />
    </div>
  )
}

export default React.forwardRef(Home)
