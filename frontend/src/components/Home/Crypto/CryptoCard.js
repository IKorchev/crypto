import React, { useEffect, useState } from "react"
import { useStore } from "../../../contexts/StoreContext"
import { useAuth } from "../../../contexts/AuthContext"

const CryptoCard = ({ name, symbol, price, marketCap, image, new24hrChange }) => {
  const { user } = useAuth()
  const { addCoin, deleteCoin, store } = useStore()
  const [isFavourite, setIsFavourite] = useState(null)
  const [userFavourites, setUserFavourites] = useState([])
  const handleIconClick = (e) => {
    e.preventDefault()
    isFavourite ? deleteCoin(name) : addCoin(name)
  }

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
            $
            {price
              .toFixed(
                2
                // price > 10
                //   ? 2
                //   : price < 9.99 && price > 0.1
                //   ? 4
                //   : price < 0.1 && price > 0.0009
                //   ? 6
                //   : price < 0.00099 && price > 0.0000009
                //   ? 8
                //   : 10
              )
              .toLocaleString("en-US")}
          </p>
          <p className={new24hrChange > 0 ? "text-green" : "text-red"}>
            {new24hrChange > 0
              ? ` +` + new24hrChange.toFixed(2)
              : new24hrChange.toFixed(2)}
            %
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
