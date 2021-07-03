import React, { useState } from "react"
import { useStore } from "../contexts/StoreContext"
import Spinner from "./Spinner"
import Cards from "./Cards"

const Crypto = () => {
  const [searchInput, setSearchInput] = useState("")
  const { data, userFavourites } = useStore()
  const [sortByFavourites, setSortByFavourites] = useState(false)

  return (
    <div id='crypto-page'>
      <h1> Cryptocurrencies</h1>
      <div id='search-bar'>
        <label htmlFor='coin-name'>Search</label>
        <span id='input-wrapper'></span>
        <input
          id='coin-name'
          placeholder='Search'
          type='text'
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
        />
      </div>
      <div className='card info'>
        <p>Icon</p>
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
