import { AdvancedChart, MarketOverview } from "react-tradingview-embed"
import React from "react"
import { marketProps } from "./TradingViewChartConfig.js"
import Footer from "../components/Footer/Footer.js"
const chartProps = {
  autosize: true,
  symbol: "BINANCE:BTCUSDT",
  interval: "D",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "en",
  toolbar_bg: "#f1f3f6",
  withdateranges: true,
  hide_side_toolbar: false,
  details: true,
  enable_publishing: true,
  allow_symbol_change: true,
  container_id: "chart-container",
}

const TradingViewCharts = () => {
  return (
    <>
      <div className='mt-5 charts-container text-white text-center'>
        <div>
          <h5>Charts</h5>
          <AdvancedChart widgetProps={chartProps} />
        </div>
        <div>
          <h5>Cryptocurrency</h5>
          <MarketOverview widgetProps={marketProps} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TradingViewCharts
