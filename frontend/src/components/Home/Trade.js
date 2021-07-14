export const Trade = ({ eventTime, symbol, price, quantity }) => {
  let time = new Date(eventTime).toLocaleString("en-UK")

  return (
    <>
      <div className='trade-card'>
        <p> {time}</p>
        <p> {symbol}</p>
        <p> ${parseFloat(price).toFixed(2)}</p>
        <p>
          {parseFloat(quantity).toFixed(2)} {symbol.slice(0, -4)}
        </p>
      </div>
    </>
  )
}
