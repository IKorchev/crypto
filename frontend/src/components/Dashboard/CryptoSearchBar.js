import React from "react"

const CryptoSearchBar = ({ setSearchInput }) => {
  return (
    <div className='d-flex justify-content-end align-items-center w-100 my-2'>
      <div className='search-bar'>
        <label htmlFor='coin-name '>Search</label>
        <input
          className='coin-name'
          placeholder='Name or symbol'
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
