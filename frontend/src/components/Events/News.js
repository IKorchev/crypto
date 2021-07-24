import gsap from "gsap"
import React, { useEffect, useState, useRef } from "react"
import NewsCard from "./NewsCard"
import { useStore } from "../../contexts/StoreContext"
const News = () => {
  const cardsParentRef = useRef(null)
  const { news } = useStore()

  useEffect(() => {
    gsap.from(cardsParentRef.current.children, {
      stagger: 0.3,
      ease: "power4.out",
      opacity: 0,
    })
  }, [news])
  return (
    <div className='news-page-wrapper'>
      <h1 className='text-start h4 py-2 border-bottom '>Cryptocurrency news</h1>
      <div ref={cardsParentRef} className='news-cards-wrapper'>
        {news &&
          news.map((article, i) => (
            <NewsCard
              key={i}
              datePublished={article.publishedAt}
              description={article.description}
              url={article.url}
              title={article.title}
              urlToImage={article.urlToImage}
              author={article.author}
              source={article.source}
            />
          ))}
      </div>
    </div>
  )
}

export default News
