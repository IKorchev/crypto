import React, { useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { MiniChart } from "react-tradingview-embed"
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
    <div>
      <h1 className='text-center'>Your saved cryptocurrencies</h1>
      <div ref={parentRef} className='account-tradingview-cards-container'>
        {userFavourites &&
          userFavourites.map((object) => (
            <div className='minichart'>
              <SingleTicker
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
