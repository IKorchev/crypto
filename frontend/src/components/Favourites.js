import React, { useState, useEffect } from "react"

const Favourites = ({ favourites, deleteCoin }) => {
  return (
    <>
      {favourites.length > 0 ? (
        <div id='favourites-page'>
          <h1>Your saved cryptocurrencies</h1>
          <div className='container'>
            {favourites.map((coin, i) => (
              <div key={i} className='coin-container'>
                <h3>{coin}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    deleteCoin(coin)
                  }}>
                  <div> </div>
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
