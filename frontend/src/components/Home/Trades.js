import React from "react"
import { Trade } from "./Trade"
import { useStore } from "../../contexts/StoreContext"
const Trades = () => {
  const { trades } = useStore()

  return (
    <div className='trades-wrapper'>
      <h2 className='text-white text-center'>Trades</h2>
      <div className='trades-content styled-scrollbar'>
        <div className='trade-card-label'>
          <p>Time</p>
          <p>Symbol</p>
          <p>Price</p>
          <p>Amount</p>
        </div>
        {trades.map((item) => (
          <Trade
            eventTime={item.eventTime}
            symbol={item.symbol}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  )
}

export default Trades
