import { useState, useEffect, useRef } from "react"
import { useStore } from "../../contexts/StoreContext"
import { useAuth } from "../../contexts/AuthContext"
import { filterFunction } from "../helper"
//COMPONENTS
import CryptoCard from "./CryptoCard"
import Trades from "./Trades"
import CryptoCardsLabel from "./CryptoCardsLabel"
import CryptoSearchBar from "./CryptoSearchBar"
import Spinner from "../Spinner"
import Footer from "../Footer/Footer"
import LiquidationsList from "./LiquidationsList"
import gsap from "gsap"
import Jumbotron from "./Jumbotron"
const Dashboard = () => {
  //contexts
  const { data, liquidations } = useStore()
  const { user, userFavourites } = useAuth()
  //refs and state
  const contentRef = useRef()
  const [searchInput, setSearchInput] = useState("")
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const [loading, setLoading] = useState(true)

  // animation
  useEffect(() => {
    data && user && setLoading(false)
  }, [data, user, loading])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Jumbotron loading={loading} />
          <div ref={contentRef} className='home-page-wrapper home-page-wrapper-outter'>
            <div id='crypto-page'>
              <div className='d-flex w-100 align-items-around'>
                <h1 className='text-center my-3'>Prices</h1>
                <CryptoSearchBar setSearchInput={setSearchInput} />
              </div>
              {/* This is the upper card with the Labels */}
              <CryptoCardsLabel
                sortByFavourites={sortByFavourites}
                setSortByFavourites={setSortByFavourites}
              />
              <div id='cards-container' className='styled-scrollbar'>
                {data &&
                  userFavourites &&
                  data
                    .filter((el) =>
                      filterFunction(el, sortByFavourites, userFavourites, searchInput)
                    )
                    .map((obj) => (
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
            <Trades />
            <LiquidationsList liquidations={liquidations} />
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default Dashboard
