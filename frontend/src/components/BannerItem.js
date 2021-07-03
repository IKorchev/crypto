import React, { useEffect, useState } from "react"

const BannerItem = ({ coin }) => {
  const [coinPrice, setCoinPrice] = useState(coin.current_price)
  const [priceDiff, setPriceDiff] = useState(coin.price_change_percentage_24h.toFixed(2))
  const isPositive = priceDiff > 0

  useEffect(() => {
    if (coin) {
      console.log(coin)
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${coin.symbol}usdt@ticker`
      )
      socket.onmessage = (evt) => {
        // listen to data sent from the websocket server
        const message = JSON.parse(evt.data)
        setCoinPrice(parseFloat(message.c))
        setPriceDiff(parseFloat(message.P).toFixed(2))
      }
    }
  }, [coin, isPositive])
  return (
    <li className='banner-item'>
      {!coin || !coinPrice || !priceDiff ? (
        <></>
      ) : (
        <div className='banner-content'>
          <h5>
            {coin.symbol.toUpperCase()} <span className='muted'>{coin.name}</span>
          </h5>
          <div className={`prices ${isPositive ? "text-green" : "text-red"}  `}>
            <h5>${coinPrice.toFixed(2).toLocaleString("en-US")} </h5>
            <span>{isPositive && ` +${priceDiff}%`}</span>
          </div>
        </div>
      )}
    </li>
  )
}

export default BannerItem
