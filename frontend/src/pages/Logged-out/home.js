import React, { useRef, useEffect } from "react"
import CryptoInfo from "../../assets/CryptoInfo.svg"
import LandingPageCards from "../../components/LandingPage/LandingPageCards"
import gsap from "gsap"
import { Power1 } from "gsap"
import { ScrollToPlugin } from "gsap/all"
import TradingViewCard from "../../components/Account/TradingViewCard"
import Footer from "../../components/Footer/Footer"
import { useNavigate } from "react-router-dom"

gsap.registerPlugin(ScrollToPlugin)
const Home = () => {
  const headerRef = useRef(null)
  const parentRef = useRef(null)
  const navigate = useNavigate()
  const scrollDown = () => {
    gsap.to(window, { duration: 0.5, delay: 0, scrollTo: ".landing-page-cards-wrapper" })
  }
  useEffect(() => {
    gsap.from(headerRef.current.children, {
      opacity: 0,
      stagger: 0.2,
      ease: Power1.easeIn,
    })
  }, [])
  const fadeOutAnimation = (to) => {
    gsap.to(parentRef.current, {
      opacity: 0,
      duration: 1,
      ease: Power1.easeIn,
      onComplete: () => navigate(to),
    })
  }

  return (
    <div>
      <div ref={parentRef} id='landing-page'>
        <div id='header' ref={headerRef}>
          <h1>
            <img src={CryptoInfo} alt='CryptoInfo header'></img>
          </h1>
          <div>
            <h5>
              News and updates on cryptocurrencies. Get real-time price data. Save favorites
              and more.
            </h5>
          </div>
          <div>
            <button
              className='cto-button register-button'
              onClick={(e) => {
                e.preventDefault()
                fadeOutAnimation("/register")
              }}>
              Register
            </button>
          </div>
          <div className='login-button-container'>
            <p>
              Already have an account?
              <button
                className='login-button'
                onClick={(e) => {
                  e.preventDefault()
                  fadeOutAnimation("/login")
                }}>
                Log in
              </button>
            </p>
          </div>
        </div>
        <div className='scroll-btn-div'>
          <button className='scroll-btn' onClick={() => scrollDown()}>
            <span>Scroll down</span>
          </button>
        </div>
      </div>
      <LandingPageCards />
      <TradingViewCard />
    </div>
  )
}

export default React.forwardRef(Home)
