import React, { useEffect, useState, useRef } from "react"

const BannerItem = ({ coin, realtimePrices }) => {
  const [coinPrice, setCoinPrice] = useState(" ")
  const [the24hrPriceChange, setThe24hrPriceChange] = useState(" ")
  useEffect(() => {
    realtimePrices.forEach((el) => {
      const elsymbol = el.s.toLowerCase()
      const mappedSymbol = `${coin.symbol.toLowerCase()}usdt`
      if (mappedSymbol === elsymbol) {
        const price = parseFloat(el.c)
        const formattedPrice = new Intl.NumberFormat("en-US").format(price)
        setCoinPrice(`$${formattedPrice}`)
        setThe24hrPriceChange(` ${el.P > 0 ? "+" : " "}${parseFloat(el.P).toFixed(2)}%`)
      }
    })
  }, [realtimePrices, coin, coinPrice, the24hrPriceChange])
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
            <h5>{coinPrice} </h5>
            <sub
              className={the24hrPriceChange.startsWith(" +") ? "text-green" : "text-red"}>
              {/* prettier-ignore */ }
              {the24hrPriceChange}
            </sub>
          </div>
        </div>
      )}
    </li>
  )
}

export default BannerItem
