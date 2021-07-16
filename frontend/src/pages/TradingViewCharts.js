import { AdvancedChart, MarketOverview } from "react-tradingview-embed"
import React from "react"
import { marketProps } from "./TradingViewChartConfig.js"
import Footer from "../components/Footer/Footer.js"
const chartProps = {
  autosize: true,
  symbol: "BINANCE:BTCUSDT",
  interval: "15",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "uk",
  toolbar_bg: "#f1f3f6",
  withdateranges: true,
  hide_side_toolbar: false,
  range: "1D",
  hotlist: true,
  details: true,
  enable_publishing: true,
  allow_symbol_change: true,
  container_id: "chart-container",
  watchlist: [
    "BINANCE:BTCUSDT",
    "BINANCE:ETHUSDT",
    "BINANCE:BNBUSDT",
    "BINANCE:ADAUSDT",
    "BINANCE:XRPUSDT",
    "BINANCE:DOGEUSDT",
    "BINANCE:DOTUSDT",
    "BINANCE:UNIUSDT",
    "BINANCE:SOLUSDT",
    "BINANCE:LINKUSDT",
    "BINANCE:LTCUSDT",
    "BINANCE:MATICUSDT",
  ],
}

const TradingViewCharts = () => {
  return (
    <>
      <div className='mt-5 charts-container text-white text-center'>
        <div>
          <AdvancedChart widgetProps={chartProps} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TradingViewCharts
