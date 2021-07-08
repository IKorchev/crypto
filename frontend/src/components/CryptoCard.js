import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
import { useAuth } from "../contexts/AuthContext"
const CryptoCard = ({
  name,
  symbol,
  price,
  marketCap,
  image,
  newPrice,
  new24hrChange,
}) => {
  const { user } = useAuth()
  const { addCoin, deleteCoin, store } = useStore()
  const [coinPrice, setCoinPrice] = useState(`$${new Intl.NumberFormat().format(price)}`)
  const [the24hrPriceChange, setThe24hrPriceChange] = useState("No data")
  const [isFavourite, setIsFavourite] = useState(null)
  const [userFavourites, setUserFavourites] = useState([])
  const handleIconClick = (e) => {
    e.preventDefault()
    isFavourite ? deleteCoin(name) : addCoin(name)
  }
  useEffect(() => {
    setThe24hrPriceChange(
      new24hrChange === undefined
        ? "No data"
        : new24hrChange > 0
        ? `+${new24hrChange.toFixed(2)}%`
        : `${new24hrChange.toFixed(2)}%`
    )
    setCoinPrice(!newPrice ? coinPrice : `$${new Intl.NumberFormat().format(newPrice)}`)
  }, [newPrice, new24hrChange, coinPrice])

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
          <p>{coinPrice}</p>
          <p
            className={`${
              the24hrPriceChange.startsWith("-") ? "text-red" : "text-green"
            }`}>
            {the24hrPriceChange}
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

export default CryptoCard
