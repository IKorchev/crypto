import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
import { useAuth } from "../contexts/AuthContext"

const Cards = ({ name, symbol, price, marketCap, image }) => {
  const { user } = useAuth()
  const { addCoin, deleteCoin, store, realtimePrices } = useStore()
  const [coinPrice, setCoinPrice] = useState(price)
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
        setCoinPrice(parseFloat(el.p))
      }
    })
  }, [realtimePrices, symbol])

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
    //prettier-ignore
    <div className='card'>
      <img className='card-icon' src={image} alt="Coin logo" />
      <p>
        {name} / <strong>{symbol.toUpperCase()}</strong>
      </p>
      <p>${coinPrice.toFixed(2)}</p>
      <p>${marketCap.toLocaleString()}</p>
      <i type="button" role="button" tabIndex="-1" onClick={handleIconClick} className={`bi bi-${isFavourite ? "star-fill" : "star"}`}></i>
    </div>
  )
}

export default Cards
