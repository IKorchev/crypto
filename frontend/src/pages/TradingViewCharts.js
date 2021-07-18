import { AdvancedChart, MiniChart } from "react-tradingview-embed"
import React, { useEffect, useState } from "react"
import { chartProps } from "./TradingViewChartConfig.js"
import Footer from "../components/Footer/Footer.js"
import { useAuth } from "../contexts/AuthContext.js"

const TradingViewCharts = () => {
  const { userFavourites } = useAuth()
  const [userWatchlist, setUserWatchlist] = useState(["BINANCE:BTCUSDT"])
  useEffect(() => {
    //This is to pass in the Tradingview widget so the user can chart whichever cryptos he saved
    if (userFavourites) {
      const array = userFavourites.map((object) => `BINANCE:${object.symbol}USDT`)
      setUserWatchlist(array)
    }
  }, [userFavourites])

  return (
    <>
      <div className='charts-container text-white text-center'>
        {userWatchlist.length > 1 && (
          <AdvancedChart widgetProps={{ ...chartProps, watchlist: userWatchlist }} />
        )}
      </div>
      <div>
        <h1 className='text-center text-white my-5'>Mini Charts</h1>
        <div className='minicharts-container my-3'>
          {userWatchlist.length > 1 &&
            userWatchlist.map((object) => (
              <div className='minichart'>
                <MiniChart
                  widgetProps={{
                    dateRange: "1Y",
                    trendLineColor: "rgba(232, 0, 251,0.8)",
                    underLineColor: "rgba(32, 18, 77,0.5)",
                    underLineBottomColor: "rgba(0, 11, 14,0.5)",
                    isTransparent: true,
                    width: "100%",
                    autosize: true,
                    symbol: object,
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TradingViewCharts
