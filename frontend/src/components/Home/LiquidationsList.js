import React from "react"

const LiquidationsList = ({ liquidations }) => {
  return (
    <div className='liquidations-wrapper w-100 '>
      <h1 className='text-white'>Liquidations</h1>
      <div className='liquidations-content styled-scrollbar'>
        <div className='liquidation-card-labels'>
          <h6>Symbol</h6>
          <h6>Order type</h6>
          <h6>Order status</h6>
          <h6>Average price</h6>
          <h6>Side</h6>
          <h6>Quantity</h6>
        </div>
        {liquidations &&
          liquidations.map((el) => (
            <div className='text-white d-flex flex-column '>
              <div className='liquidation-card'>
                <h6>{el.o.s}</h6>
                <h6>{el.o.o}</h6>
                <h6>{el.o.X}</h6>
                <h6>{el.o.ap}</h6>
                <h6>{el.o.S}</h6>
                <h6>{el.o.q.toLocaleString()}</h6>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default LiquidationsList
