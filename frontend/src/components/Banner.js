import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
import BannerItem from "./BannerItem"
const Banner = () => {
  const { data, realtimePrices } = useStore()
  const [top, setTop] = useState(null)
  useEffect(() => {
    data && setTop(data.slice(0, 7))
  }, [data])


  return (
    <div className='banner-wrapper'>
      <ul className='banner-list'>
        {!top ? (
          <></>
        ) : (
          top.map(
            (coin, i) =>
              coin.symbol !== "usdt" &&
              coin.symbol !== "usdc" && (
                <BannerItem key={i} coin={coin} realtimePrices={realtimePrices} />
              )
          )
        )}
      </ul>
    </div>
  )
}

export default Banner
