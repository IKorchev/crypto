import { useState, useEffect, useRef } from "react"
import { useStore } from "../../contexts/StoreContext"
import { useAuth } from "../../contexts/AuthContext"
import { filterFunction } from "../../components/helper"
//COMPONENTS
import CryptoCard from "../../components/Dashboard/CryptoCard"
import Trades from "../../components/Dashboard/Trades"
import CryptoCardsLabel from "../../components/Dashboard/CryptoCardsLabel"
import CryptoSearchBar from "../../components/Dashboard/CryptoSearchBar"
import Footer from "../../components/Footer/Footer"
import LiquidationsList from "../../components/Dashboard/LiquidationsList"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import Jumbotron from "../../components/Dashboard/Jumbotron"

const Dashboard = () => {
  //contexts
  const { data, liquidations, trades } = useStore()
  const { userFavourites } = useAuth()
  //refs and state
  const contentRef = useRef()
  const parentRef = useRef()
  const [searchInput, setSearchInput] = useState("")
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const navigate = useNavigate()
  const handleScrollClick = () => {
    gsap.to(window, { duration: 0.5, delay: 0, scrollTo: contentRef.current })
  }
  const handleClick = () => {
    gsap.to(parentRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        navigate("/charts")
      },
    })
  }

  return (
    <>
      <div ref={parentRef}>
        <Jumbotron handleClick={handleClick} handleScrollClick={handleScrollClick} />
        <div ref={contentRef} className='home-page-wrapper home-page-wrapper-outter'>
          <div id='crypto-page'>
            <div className='d-flex w-100 align-items-around'>
              <h1 className='text-center my-3'>Prices</h1>
              <CryptoSearchBar setSearchInput={setSearchInput} />
            </div>
            {/* Upper card with the Labels */}
            <CryptoCardsLabel
              sortByFavourites={sortByFavourites}
              setSortByFavourites={setSortByFavourites}
            />
            <div id='cards-container' className='styled-scrollbar'>
              {data
                ?.filter((el) => filterFunction(el, sortByFavourites, userFavourites, searchInput))
                ?.map((obj) => (
                  <CryptoCard
                    key={obj.market_cap}
                    name={obj.name}
                    symbol={obj.symbol}
                    marketCap={obj.market_cap}
                    price={obj.newPrice || obj.current_price}
                    image={obj.image}
                    new24hrChange={obj.new24Change || obj.price_change_percentage_24h}
                  />
                ))}
            </div>
            <div>
              <h6 className='text-muted'>Prices based on Binance Futures Exchange.</h6>
            </div>
          </div>
          {trades.length && <Trades trades={trades} />}
          {liquidations.length && <LiquidationsList liquidations={liquidations} />}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
