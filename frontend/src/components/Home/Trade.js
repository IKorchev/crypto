export const Trade = ({ eventTime, symbol, price, quantity }) => {
  const dateAndTime = new Date(eventTime).toLocaleString("en-UK")
  const time = dateAndTime.slice(dateAndTime.length - 8)
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
