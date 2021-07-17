import React, { useState, useEffect, useRef } from "react"
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
import gsap from "gsap"
const Crypto = () => {
  const jumboRef = useRef()
  const contentRef = useRef()
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

  useEffect(() => {
    if (!loading) {
      gsap.to(jumboRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
        duration: 1,
      })

      gsap.to(contentRef.current, {
        delay: 1,
        clipPath: "polygon(100% 0, 1% 0, 1% 100%, 100% 100%)",
        duration: 2,
        ease: "circ.out",
      })
    }
  }, [loading])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div ref={jumboRef} className='jumbotron-wrapper text-white clipped-path'>
            <h3>Welcome to</h3>
            <h1 className='mb-5'>CryptoInfo</h1>
            <h3>Take a look at the prices in real time</h3>
          </div>
          <div
            ref={contentRef}
            className='home-page-wrapper home-page-wrapper-outter clipped-path2'>
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

export default Crypto
