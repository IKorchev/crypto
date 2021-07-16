import React from "react"

const CryptoSearchBar = ({ setSearchInput }) => {
  return (
    <div className='d-flex justify-content-center align-items-center w-100 my-2'>
      <label className='text-white text-end mx-2 fs-5'>Search</label>
      <div className='search-bar'>
        <label htmlFor='coin-name'>Search</label>
        <input
          className='coin-name'
          type='text'
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
        />
        <span id='input-wrapper'></span>
      </div>
    </div>
  )
}

export default CryptoSearchBar
