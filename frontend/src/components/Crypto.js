import React, { useState } from "react"
import Cards from "./Cards"

const Crypto = ({ user, data }) => {
  const [searchInput, setSearchInput] = useState("")

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
        <p></p>
        <p>Name</p>
        <p>Price</p>
        <p>Market Cap</p>
      </div>
      <div id='cards-container'>
        {data
          .filter((el) => el.name.toLowerCase().includes(searchInput.toLowerCase()))
          .map((obj) => (
            <Cards
              user={user}
              key={obj.market_cap}
              name={obj.name}
              symbol={obj.symbol}
              marketCap={obj.market_cap}
              price={obj.current_price}
              image={obj.image}
            />
          ))}
      </div>
    </div>
  )
}

export default Crypto