import React, { useState, useEffect } from "react"
import { useStore } from "../../../contexts/StoreContext"
import { useAuth } from "../../../contexts/AuthContext"
import CryptoCard from "../Crypto/CryptoCard"
import { filterFunction } from "./helper"

const Crypto = () => {
  const [searchInput, setSearchInput] = useState("")
  const { data, store } = useStore()
  const { user } = useAuth()
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const [userFavourites, setUserFavourites] = useState(null)

  //Filter function for whenever searching

  //ANIMATION

  //Listen for any changes in DB
  useEffect(() => {
    const unsubscribe = store
      .collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserFavourites(snap.data().cryptos)
      })
    return () => unsubscribe()
  }, [store, user.uid])

  return (
    <div id='crypto-page'>
      <h1> Cryptocurrencies</h1>
      <div className='search-bar'>
        <label htmlFor='coin-name'>Search</label>
        <span id='input-wrapper'></span>
        <input
          className='coin-name'
          placeholder='Search'
          type='text'
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
        />
      </div>
      {/* prettier-ignore */}
      {/* This is the upper card with the Labels */}
      <div className='card info'>
        <p className='card-icon'>Icon</p>
        <p>Name</p>
        <p>Price</p>
        <p>24hr</p>
        <p>Market Cap</p>
        <i
          role='button'
          aria-controls='cards-container'
          className={`bi bi-star${sortByFavourites ? "-fill" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            setSortByFavourites((state) => !state)
          }}></i>
      </div>
      <div id='cards-container'>
        {data &&
          data
            .filter((el) =>
              filterFunction(el, sortByFavourites, userFavourites, searchInput)
            )
            .map((obj) => (
              <CryptoCard
                key={obj.market_cap}
                name={obj.name}
                symbol={obj.symbol}
                marketCap={obj.market_cap}
                price={obj.newPrice || obj.current_price}
                image={obj.image}
                new24hrChange={obj.new24Change || obj.price_change_percentage_24h}
              />
            ))}
      </div>
    </div>
  )
}

export default Crypto