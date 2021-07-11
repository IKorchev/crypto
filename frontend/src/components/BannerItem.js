import gsap from "gsap"
import { useEffect } from "react"

const BannerItem = ({ new24Change, name, newPrice, symbol }) => {
  useEffect(() => {
    gsap.fromTo(
      ".banner-item",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.5,
      }
    )
  }, [])

  return (
    <>
      <li className='banner-item'>
        <div className='banner-content'>
          <h5>
            <span className='mr-1'>{symbol.toUpperCase()}</span>
            <span className='muted'>{name}</span>
          </h5>
          <div className='prices'>
            <h5 className='mr-1'>${newPrice.toLocaleString()}</h5>
            <h5
              className={
                // if positive text will be green if negative it will be red
                !new24Change
                  ? "display-none"
                  : new24Change > 0
                  ? "text-green"
                  : "text-red"
              }>
              {
                // make sure there's a + or - when displaying the percentage change
                new24Change > 0 ? "+" + new24Change : new24Change
              }
              %
            </h5>
          </div>
        </div>
      </li>
    </>
  )
}

export default BannerItem
