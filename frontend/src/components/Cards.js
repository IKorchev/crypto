import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
import { useAuth } from "../contexts/AuthContext"

const Cards = ({ name, symbol, price, marketCap, image }) => {
  const { user } = useAuth()
  const { addCoin, deleteCoin, store, realtimePrices } = useStore()
  const [coinPrice, setCoinPrice] = useState(
    `$${
      price >= 10
        ? new Intl.NumberFormat("en-US").format(price)
        : price <= 0.0001 && price >= 0.0000001
        ? price.toFixed(8)
        : price <= 0.09 && price >= 0.0001
        ? price.toFixed(6)
        : price.toFixed(4)
    }`
  )
  const [the24hrPriceChange, setThe24hrPriceChange] = useState(" ")
  const [isFavourite, setIsFavourite] = useState(null)
  const [userFavourites, setUserFavourites] = useState([])
  const handleIconClick = (e) => {
    e.preventDefault()
    isFavourite ? deleteCoin(name) : addCoin(name)
  }
  useEffect(() => {
    realtimePrices.forEach((el) => {
      const elsymbol = el.s.toLowerCase()
      const mappedSymbol = `${symbol.toLowerCase()}usdt`
      if (mappedSymbol === elsymbol) {
        const price = parseFloat(el.c)
        const formattedPrice = new Intl.NumberFormat("en-US").format(price)
        setCoinPrice(`$${formattedPrice}`)
        setThe24hrPriceChange(` ${el.P > 0 ? "+" : " "}${parseFloat(el.P).toFixed(2)}%`)
      }
    })
  }, [realtimePrices, symbol, coinPrice])

  useEffect(() => {
    const db = store.collection("users").doc(user.uid)
    if (userFavourites.includes(name)) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
    return db.onSnapshot((snap) => {
      if (snap) {
        setUserFavourites(snap.data().cryptos)
      } else {
        console.log("waiting")
      }
    })
  }, [userFavourites, name, store, user.uid])

  return (
    <>
      {symbol === "usdt" || symbol === "usdc" || symbol === "busd" ? (
        <></>
      ) : (
        <div className='card'>
          <img className='card-icon' src={image} alt='Coin logo' />
          <p>
            {name} / <strong>{symbol.toUpperCase()}</strong>
          </p>
          <p>
            {coinPrice}
            <sup
              className={`${
                the24hrPriceChange.startsWith(" +") ? "text-green" : "text-red"
              }`}>
              {the24hrPriceChange}
            </sup>
          </p>

          <p>${marketCap.toLocaleString()}</p>
          <i
            type='button'
            role='button'
            tabIndex='-1'
            onClick={handleIconClick}
            className={`bi bi-${isFavourite ? "star-fill" : "star"}`}></i>
        </div>
      )}
    </>
  )
}

export default Cards
