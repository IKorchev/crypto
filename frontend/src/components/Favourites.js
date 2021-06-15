import React, { useState, useEffect } from "react"
const Favourites = ({ favourites, deleteCoin }) => {
  const [coins, setCoins] = useState([
    "Bitcoin",
    "Ethereum",
    "Bitcoin",
    "Ethereum",
    "Bitcoin",
    "Ethereum",
    "Bitcoin",
    "Ethereum",
    "Bitcoin",
    "Ethereum",
  ])
  const reduceArr = (arr, coin) => {
    let newArr = arr.filter((item) => item !== coin)
    return newArr
  }

  useEffect(() => {
    console.log(coins)
  }, [coins])
  return (
    <>
      {coins.length > 0 ? (
        <div id='favourites-page'>
          <h1>Your saved cryptocurrencies</h1>
          <div className='container'>
            {coins.map((coin, i) => (
              <div key={i} className='coin-container'>
                <h3>{coin}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setCoins(reduceArr(coins, coin))
                  }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div id='favourites-page'>
          <h1>You haven't saved anything yet</h1>
        </div>
      )}
    </>
  )
}

export default Favourites
