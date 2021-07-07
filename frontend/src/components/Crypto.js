import React, { useState, useEffect } from "react"
import { useStore } from "../contexts/StoreContext"
import { useAuth } from "../contexts/AuthContext"
import Spinner from "./Spinner"
import Cards from "./Cards"
import gsap from "gsap"
const Crypto = () => {
  const [searchInput, setSearchInput] = useState("")
  const { data, store } = useStore()
  const { user } = useAuth()
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const [userFavourites, setUserFavourites] = useState(null)
  const filterFunction = (el) => {
    if (el.name.toLowerCase().includes(searchInput.toLowerCase())) {
      if (!sortByFavourites) {
        return true
      } else {
        return userFavourites.includes(el.name)
      }
    }
    if (el.symbol.toLowerCase().includes(searchInput.toLowerCase())) {
      if (sortByFavourites) {
        return true
      } else {
        return userFavourites.includes(el.name)
      }
    }
    return false
  }

  useEffect(() => {
    gsap.from("#cards-container", {
      opacity: 0,
      height: 800,
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
      <div id='cards-container'>
        {data === null ? (
          <Spinner />
        ) : (
          data
            .filter((el) => filterFunction(el))
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
