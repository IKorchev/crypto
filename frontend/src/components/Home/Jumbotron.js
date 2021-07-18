import React, { useEffect, useRef } from "react"
import gsap from "gsap"
const Jumbotron = ({ loading }) => {
  const jumboRef = useRef()
  useEffect(() => {
    !loading &&
      gsap.to(jumboRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
        duration: 1,
      })
  }, [loading])

  return (
    <div ref={jumboRef} className='jumbotron-wrapper text-white clipped-path'>
      <h3>Welcome to</h3>
      <h1 className='mb-5'>CryptoInfo</h1>
      <h3>Take a look at the prices in real time</h3>
    </div>
  )
}

export default Jumbotron
