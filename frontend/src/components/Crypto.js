import React, { useState, useEffect } from "react"
import { useStore } from "../contexts/StoreContext"
import { useAuth } from "../contexts/AuthContext"
import Cards from "./Cards"
import gsap from "gsap"
const Crypto = () => {
  const [searchInput, setSearchInput] = useState("")
  const { data, store } = useStore()
  const { user } = useAuth()
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const [userFavourites, setUserFavourites] = useState(null)

  useEffect(() => {
    gsap.from("#cards-container", {
      height: 500,
      opacity: 0,
      duration: 0.9,
      ease: "slow",
    })
  }, [])

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

      <div id='cards-container'>
      <div className='card info'>
        <p className="card-icon">Icon</p>
        <p>Name</p>
        <p>Price</p>
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
        {data === null ? (
          <></>
        ) : sortByFavourites ? (
          data
            .filter((el) => userFavourites.includes(el.name))
            .filter((el) => el.name.toLowerCase().includes(searchInput.toLowerCase()))
            .map((obj) => (
              <Cards
                key={obj.market_cap}
                name={obj.name}
                symbol={obj.symbol}
                marketCap={obj.market_cap}
                price={obj.current_price}
                image={obj.image}
              />
            ))
        ) : (
          data
            .filter((el) => el.name.toLowerCase().includes(searchInput.toLowerCase()))
            .map((obj) => (
              <Cards
                key={obj.market_cap}
                name={obj.name}
                symbol={obj.symbol}
                marketCap={obj.market_cap}
                price={obj.current_price}
                image={obj.image}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default Crypto
