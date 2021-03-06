import { Trade } from "./Trade"
const Trades = ({ trades }) => {
  return (
    <div className='trades-wrapper'>
      <div className='d-flex justify-content-between text-white'>
        <h1 className='text-white'>Trades</h1>
        <h1>
          <small>BTC & ETH</small>
        </h1>
      </div>
      <div className='trades-content styled-scrollbar'>
        <div className='trade-card-label'>
          <p>Time</p>
          <p>Symbol</p>
          <p>Price</p>
          <p>Amount</p>
        </div>
        {trades?.map((item, i) => (
          <Trade
            key={i}
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
