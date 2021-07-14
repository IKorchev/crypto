import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Power0 } from "gsap/all"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const cardsContent = [
  {
    image: <i className='bi bi-clock-history'></i>,
    title: "Real time",
    text: "See real time price updates and market data",
  },
  {
    image: <i className='bi bi-currency-bitcoin'></i>,
    title: "Bitcoin",
    text: "More than 50 cryptocurrencies supported",
  },
  {
    image: <i className='bi bi-calendar2-event'></i>,
    title: "Events",
    text: "See latest events and news about cryptocurrencies",
  },
]

const LandingPageCards = () => {
  const parentEl = useRef()
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    gsap.from(parentEl.current.children, {
      opacity: 0,
      stagger: 0.2,
      ease: Power0,
      scrollTrigger: {
        trigger: parentEl.current.children,
        start: "top bottom",
      },
    })
  }, [])

  return (
    <div ref={parentEl} className='landing-page-cards-wrapper'>
      {cardsContent.map((el, i) => (
        <div key={i} className='lp-card'>
          <h1 className='display-3'>{el.image}</h1>
          <h5>{el.title}</h5>
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  )
}

export default LandingPageCards
