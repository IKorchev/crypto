import React from "react"

const LiquidationsList = ({ liquidations }) => {
  return (
    <div className='liquidations-wrapper'>
      <div className='liquidations-content'>
        {liquidations && liquidations.map(el => (
            console.log(el)
        ))}

      </div>
    </div>
  )
}

export default LiquidationsList
