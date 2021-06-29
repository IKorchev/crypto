import React, { useRef, useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
const Cards = ({ name, symbol, price, marketCap, image }) => {
  const { userFavourites, addCoin, deleteCoin } = useStore()
  const [coinPrice, setCoinPrice] = useState(price)
  const [realTimePrice, setRealTimePrice] = useState(null)
  const [isFavourite, setIsFavourite] = useState(null)

  const handleIconClick = (e) => {
    e.preventDefault()
    isFavourite ? deleteCoin(name) : addCoin(name)
  }
  useEffect(() => {
    if (userFavourites.includes(name)) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
  }, [userFavourites, name])

  useEffect(() => {
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@ticker`)
    socket.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      setCoinPrice(parseFloat(message.c))
    }
    return () => {
      socket.close()
    }
  }, [symbol])

  return (
    //prettier-ignore
    <div className='card'>
      <img className='card-icon' src={image} alt="Coin logo" />
      <p>
        {name} / <strong>{symbol.toUpperCase()}</strong>
      </p>
      <p>${!realTimePrice ? coinPrice.toFixed(2) : realTimePrice.toFixed(2)}</p>
      <p>${marketCap.toLocaleString()}</p>
      <i onClick={handleIconClick} className={`bi bi-${isFavourite ? "star-fill" : "star"}`}></i>
    </div>
  )
}

export default Cards
