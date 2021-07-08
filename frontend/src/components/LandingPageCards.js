import React from "react"
const cardsContent = [
  {
    image: <i class='bi bi-clock-history'></i>,
    title: "Real time",
    text: "See real time price updates.",
  },
  {
    image: <i class='bi bi-currency-bitcoin'></i>,
    title: "Bitcoin",
    text: "Supported 50+ cryptocurrencies",
  },
  {
    image: <i class='bi bi-stars'></i>,
    title: "Register",
    text: "Register and save your favourites",
  },
]
const LandingPageCards = () => {
  return (
    <div className='landing-page-cards-wrapper'>
      {cardsContent.map((el, i) => (
        <div key={i} className='lp-card'>
          <h1 className='display-3'>{el.image}</h1>
          <h5>{el.title}</h5>
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  )
}

export default LandingPageCards
