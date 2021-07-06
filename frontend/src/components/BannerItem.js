import React, { useEffect, useState, useRef } from "react"

const BannerItem = ({ coin, realtimePrices }) => {
  const [coinPrice, setCoinPrice] = useState(coin.current_price)
  const [isPositive, setIsPositive] = useState()
  const priceChange = useRef(coin.price_change_percentage_24h)
  useEffect(() => {
    setIsPositive(priceChange.current > 0)
    priceChange.current = coin.price_change_percentage_24h
    realtimePrices.forEach((el) => {
      const elsymbol = el.s.toLowerCase()
      const mappedSymbol = `${coin.symbol.toLowerCase()}usdt`
      if (mappedSymbol === elsymbol) {
        setCoinPrice(
          parseFloat(el.p)
            .toFixed(coinPrice < 10 ? 3 : 2) // if price is less than $10 show 1 extra number
            .toLocaleString("en-US")
        )
      }
    })
  }, [realtimePrices, coin, priceChange, coinPrice])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <li className='banner-item'>
      {!coin || !coinPrice ? (
        <></>
      ) : (
        <div className='banner-content'>
          <h5>
            {coin.symbol.toUpperCase()} <span className='muted'>{coin.name}</span>
          </h5>
          <div className='prices'>
            {/* if price is higher than $10 show 1 extra number*/}
            <h5>${coinPrice} </h5>
            <span className={`${isPositive ? "text-green" : "text-red"}  `}>
              {/* prettier-ignore */ }
              {`${isPositive ? "+" : " "} ${priceChange.current.toFixed(2)}%`}
            </span>
          </div>
        </div>
      )}
    </li>
  )
}

export default BannerItem
