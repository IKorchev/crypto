import React, { useRef } from "react"
const Jumbotron = ({ handleClick, handleScrollClick }) => {
  const jumboRef = useRef()

  return (
    <div ref={jumboRef} className='jumbotron-wrapper text-white'>
      <h3 className='mt-5'>Welcome to</h3>
      <h1 className='mb-5 mt-2'>CryptoInfo</h1>
      <h3>Take a look at the prices in real time</h3>
      <div>
        <button className='cto-button' onClick={handleClick}>
          See charts
        </button>
        <button className='cto-button-secondary' onClick={handleScrollClick}>
          See prices
        </button>
      </div>
    </div>
  )
}

export default Jumbotron
