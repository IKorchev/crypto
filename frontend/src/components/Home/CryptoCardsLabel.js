import React from "react"

const CryptoCardsLabel = ({ sortByFavourites, setSortByFavourites }) => {
  return (
    <div className='card info'>
      <p className='card-icon'>Icon</p>
      <p>Name</p>
      <p>Price</p>
      <p>24hr</p>
      <p>Market Cap</p>
      <i
        role='button'
        aria-controls='cards-container'
        className={` bi bi-star${sortByFavourites ? "-fill" : ""}`}
        onClick={(e) => {
          e.preventDefault()
          setSortByFavourites((state) => !state)
        }}></i>
    </div>
  )
}

export default CryptoCardsLabel
