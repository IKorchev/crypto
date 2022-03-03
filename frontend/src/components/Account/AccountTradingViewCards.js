import React, { useEffect, useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { SingleTicker } from "react-tradingview-embed"
import gsap from "gsap"
const AccountTradingViewCards = () => {
  const { userFavourites } = useAuth()
  const parentRef = useRef()
  useEffect(() => {
    userFavourites &&
      gsap.from(".minichart", {
        opacity: 0,
        stagger: 0.5,
      })
  }, [userFavourites])
  return (
    <div className='py-5'>
      <h1 className='text-center'>Your favourites</h1>
      <div ref={parentRef} className='account-tradingview-cards-container'>
        {userFavourites &&
          userFavourites.map((object, i) => (
            <div className='minichart'>
              <SingleTicker
                key={i}
                widgetProps={{
                  isTransparent: true,
                  width: "100%",
                  autosize: true,
                  symbol: `BINANCE:${object.symbol}USDT`,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AccountTradingViewCards
