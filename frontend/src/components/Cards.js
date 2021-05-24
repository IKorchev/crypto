import React, { useRef } from "react"

const Cards = ({ data }) => {
  let refs = useRef()
  refs.current = []
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

  return (
    <div id='crypto-page'>
      <h1> Cryptocurrencies</h1>
      <div id='cards-container'>
        {data.map((o, i) => (
          <div
            className='card'
            onClick={(e) => {
              console.log(refs.current[i])
            }}
            key={i}
            ref={addToRefs}>
            <h5>{o.name}</h5>
            <h5>
              {o.quote.USD.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Cards
