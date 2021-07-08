import React, { useEffect, useState } from "react"

const BannerItem = ({ coin }) => {
  const [coinPrice, setCoinPrice] = useState(" ")
  const [the24hrPriceChange, setThe24hrPriceChange] = useState(" ")
  useEffect(() => {
    setThe24hrPriceChange(
      !coin.new24hrChange
        ? "No data"
        : coin.new24hrChange > 0
        ? `+${coin.new24hrChange.toFixed(2)}%`
        : `${coin.new24hrChange.toFixed(2)}%`
    )
    setCoinPrice(
      !coin.newPrice ? coinPrice : `$${new Intl.NumberFormat().format(coin.newPrice)}`
    )
  }, [coin.newPrice, coin.new24hrChange, coinPrice])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <li className='banner-item'>
      {!coin.new24hrChange ? (
        <></>
      ) : (
        <div className='banner-content'>
          <h5>
            {coin.symbol.toUpperCase()} <span className='muted'>{coin.name}</span>
          </h5>
          <div className='prices'>
            {/* if price is higher than $10 show 1 extra number*/}
            <h5>{coinPrice} </h5>
            <h5
              className={the24hrPriceChange.startsWith(" +") ? "text-green" : "text-red"}>
              {/* prettier-ignore */ }
              {the24hrPriceChange}
            </h5>
          </div>
        </div>
      )}
    </li>
  )
}

export default BannerItem
