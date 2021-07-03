import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
import BannerItem from "./BannerItem"
const Banner = () => {
  const { data } = useStore()
  const [top5, setTop5] = useState(null)
  useEffect(() => {
    data && setTop5(data.slice(0, 9))
  }, [data])
  return (
    <div className='banner-wrapper'>
      <ul className='banner-list'>
        {!top5 ? (
          <></>
        ) : (
          top5.map(
            (coin, i) =>
              coin.symbol !== "usdt" &&
              coin.symbol !== "usdc" && <BannerItem key={i} coin={coin} />
          )
        )}
      </ul>
    </div>
  )
}

export default Banner
