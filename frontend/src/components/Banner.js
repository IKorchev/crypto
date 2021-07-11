import React, { useEffect, useState, useRef } from "react"
import { useStore } from "../contexts/StoreContext"
import BannerItem from "./BannerItem"

const Banner = () => {
  const { data, realtimePrices } = useStore()
  const [top, setTop] = useState([])
  const bannerListRef = useRef(null)
  useEffect(() => {
    if (realtimePrices !== null) {
      return setTop(data.slice(0, 7))
    }
  }, [data, realtimePrices])

  return (
    <>
      <div className='banner-wrapper'>
        <ul ref={bannerListRef} className='banner-list'>
          {top.length === 7 &&
            top.map(
              (coin, i) =>
                coin.symbol !== "usdt" &&
                coin.symbol !== "usdc" && (
                  <BannerItem
                    key={i}
                    symbol={coin.symbol}
                    name={coin.name}
                    new24Change={coin.new24Change || coin.price_change_percentage_24h}
                    newPrice={coin.newPrice || coin.current_price}
                  />
                )
            )}
        </ul>
      </div>
    </>
  )
}

export default Banner
