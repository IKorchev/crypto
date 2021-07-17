import { AdvancedChart } from "react-tradingview-embed"
import React from "react"
import { chartProps } from "./TradingViewChartConfig.js"
import Footer from "../components/Footer/Footer.js"

const TradingViewCharts = () => {
  return (
    <div className='charts-container text-white text-center'>
      <AdvancedChart widgetProps={chartProps} />
      <Footer />
    </div>
  )
}

export default TradingViewCharts
