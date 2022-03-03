import { AdvancedChart } from "react-tradingview-embed"
import React, { useMemo } from "react"
import Footer from "../../components/Footer/Footer.js"
import { useAuth } from "../../contexts/AuthContext.js"

const chartProps = {
  autosize: true,
  symbol: "BINANCE:BTCUSDT",
  interval: "D",
  timezone: "Etc/UTC",
  isTransparent: true,
  style: "1",
  locale: "uk",
  withdateranges: true,
  hide_side_toolbar: false,
  range: "3M",
  hotlist: true,
  details: true,
  enable_publishing: true,
  allow_symbol_change: true,
  container_id: "chart-container",
}

const TradingViewCharts = () => {
  const { userFavourites } = useAuth()
  const userWatchlist = useMemo(
    () => userFavourites.map((object) => `BINANCE:${object.symbol}USDT`),
    [userFavourites]
  )
  return (
    <>
      <div className='charts-container text-white text-center'>
        {userWatchlist && (
          <AdvancedChart widgetProps={{ ...chartProps, watchlist: userWatchlist }} />
        )}
      </div>
      <Footer />
    </>
  )
}

export default TradingViewCharts
