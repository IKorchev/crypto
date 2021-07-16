import React, { useState, useEffect } from "react"
import { useStore } from "../../contexts/StoreContext"
import { useAuth } from "../../contexts/AuthContext"
import CryptoCard from "./CryptoCard"
import { filterFunction } from "./helper"
import Trades from "./Trades"
import CryptoCardsLabel from "./CryptoCardsLabel"
import CryptoSearchBar from "./CryptoSearchBar"
import Spinner from "../Spinner"
import Footer from "../Footer/Footer"
import LiquidationsList from "./LiquidationsList"

const Crypto = () => {
  const [searchInput, setSearchInput] = useState("")
  const { data, store, liquidations } = useStore()
  const { user } = useAuth()
  const [sortByFavourites, setSortByFavourites] = useState(false)
  const [userFavourites, setUserFavourites] = useState(null)
  const [loading, setLoading] = useState(true)

  //Listen for any changes in DB
  useEffect(() => {
    const unsubscribe = store
      .collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserFavourites(snap.data().cryptos)
      })
    return () => {
      unsubscribe()
    }
  }, [store, user.uid])

  useEffect(() => {
    if (data && user) {
      return setLoading(false)
    }
  }, [data, user])
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='jumbotron-wrapper text-white text-center d-flex flex-column align-items-center justify-content-center'>
            <h1>Welcome</h1>
            <h2>to CryptoInfo</h2>
          </div>
          <div className='home-page-wrapper'>
            <div id='crypto-page'>
              <h1 className='text-center my-3'>Cryptocurrency prices</h1>

              <CryptoSearchBar setSearchInput={setSearchInput} />
              {/* This is the upper card with the Labels */}
              <CryptoCardsLabel
                sortByFavourites={sortByFavourites}
                setSortByFavourites={setSortByFavourites}
              />
              <div id='cards-container' className='styled-scrollbar'>
                {data &&
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
                <h6 className='text-muted'>Prices based on Binance Exchange.</h6>
              </div>
            </div>
            <Trades />
            <LiquidationsList liquidations={liquidations} />
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Crypto
