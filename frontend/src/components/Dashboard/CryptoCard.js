import React, { useEffect, useState } from "react"
import { useStore } from "../../contexts/StoreContext"
import { useAuth } from "../../contexts/AuthContext"
import { fixNumber } from "../helper"


const CryptoCard = ({ name, symbol, price, marketCap, image, new24hrChange }) => {
  const { user } = useAuth()
  const { addCoin, deleteCoin, store } = useStore()
  const [isFavourite, setIsFavourite] = useState(null)
  const [userFavourites, setUserFavourites] = useState([])
  const handleIconClick = (e) => {
    e.preventDefault()
    isFavourite ? deleteCoin({ name, symbol }) : addCoin({ name, symbol })
  }

  useEffect(() => {
    const db = store.collection("users").doc(user.uid)
    const names = userFavourites.map((el) => el.name)
    if (userFavourites.includes(name) || names.includes(name)) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
    return db.onSnapshot((snap) => {
      if (snap) {
        setUserFavourites(snap.data().cryptos)
      }
    })
  }, [userFavourites, name, store, user.uid])

  return (
    <>
      {symbol === "usdt" ||
      symbol === "usdc" ||
      symbol === "busd" ||
      symbol === "cusdc" ? (
        <></>
      ) : (
        <div className='card'>
          <img className='card-icon' src={image} alt='Coin logo' />
          <p>
            {name} / <strong>{symbol.toUpperCase()}</strong>
          </p>
          <p>${fixNumber(price).toLocaleString("en-US")}</p>
          <p className={`${new24hrChange > 0 ? "text-success" : "text-danger"} fw-5`}>
            <strong>
              {new24hrChange > 0
                ? ` +` + new24hrChange.toFixed(2)
                : new24hrChange.toFixed(2)}
              %
            </strong>
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
