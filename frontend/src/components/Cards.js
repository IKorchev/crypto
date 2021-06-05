import React, { useRef, useEffect } from "react"
import gsap from "gsap"
const Cards = ({ name, symbol, price, marketCap, image }) => {
  let pRef = useRef(null)
  useEffect(() => {
    console.log()
    return gsap.fromTo(
      pRef,
      {
        y: -10,
        opacity: 0,
        duration: 0.2,
        ease: "slow",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "slow",
      }
    )
  }, [price])
  return (
    //prettier-ignore
    <div className='card'>
      <img className='card-icon' src={image} alt="Coin logo"/>
      <p>
        {name} / <strong>{symbol.toUpperCase()}</strong>
      </p>
      <p ref={(el) => pRef = el}>${price.toLocaleString()}</p>
      <p>${marketCap.toLocaleString()}</p>
    </div>
  )
}
export default Cards
