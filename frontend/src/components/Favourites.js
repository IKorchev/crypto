import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useStore } from "../contexts/StoreContext"

const Favourites = () => {
  const { userFavourites, deleteCoin, db } = useStore()
  const [favs, setFavs] = useState()

  return (
    <>
      {userFavourites ? (
        <div id='favourites-page'>
          <h1>Your saved cryptocurrencies</h1>
          <div className='container'>
            {userFavourites.map((coin, i) => (
              <div key={i} className='coin-container'>
                <h3>{coin}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    deleteCoin(coin)
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
