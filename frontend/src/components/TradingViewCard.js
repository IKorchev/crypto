import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useEffect, useRef } from "react"
gsap.registerPlugin(ScrollTrigger)
const TradingViewCard = () => {
  const ref = useRef()

  useEffect(() => {
    gsap.from(ref.current.children, {
      opacity: 0,
      stagger: 0.5,
      duration: 1,
      scrollTrigger: {
        trigger: ref.current.children,
        start: "top center",
      },
    })
  }, [])
  return (
    <div ref={ref} className='tradingview-wrapper'>
      <div className='tradingview-logo-wrapper'>
        <div className='tradingview-logo'></div>
        <h1>TradingView</h1>
      </div>
      <div className='tradingview-content'>
        <h1>Create Charts</h1>
        <p>Use the most popular charts platform</p>
      </div>
    </div>
  )
}

export default TradingViewCard
