import gsap from "gsap"
import React, { useEffect, useState, useRef } from "react"
import NewsCard from "./NewsCard"

const News = () => {
  const cardsParentRef = useRef(null)
  const placeholderData = {
    status: "ok",
    totalResults: 8645,
    articles: [
      {
        source: {
          id: "mashable",
          name: "Mashable",
        },
        author: "Stan Schroeder",
        title:
          "Elon Musk says Tesla will resume Bitcoin purchases when Bitcoin gets greener",
        description:
          "It's all about clean energy, it seems. \nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoins and that it will start accepting Bitcoin for purchases, an…",
        url: "https://mashable.com/article/tesla-bitcoin-purchases-green/",
        urlToImage:
          "https://mondrian.mashable.com/2021%252F06%252F14%252Fcc%252Faf6b974e89a64972a334f8675f5dc80a.36e5a.jpg%252F1200x630.jpg?signature=XiWTfhyod6_Xl2i4nyhER_1xCXQ=",
        publishedAt: "2021-06-14T07:15:49Z",
        content:
          "It's all about clean energy, it seems. \r\nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoi… [+2508 chars]",
      },
      {
        source: {
          id: "mashable",
          name: "Mashable",
        },
        author: "Stan Schroeder",
        title:
          "Elon Musk says Tesla will resume Bitcoin purchases when Bitcoin gets greener",
        description:
          "It's all about clean energy, it seems. \nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoins and that it will start accepting Bitcoin for purchases, an…",
        url: "https://mashable.com/article/tesla-bitcoin-purchases-green/",
        urlToImage:
          "https://mondrian.mashable.com/2021%252F06%252F14%252Fcc%252Faf6b974e89a64972a334f8675f5dc80a.36e5a.jpg%252F1200x630.jpg?signature=XiWTfhyod6_Xl2i4nyhER_1xCXQ=",
        publishedAt: "2021-06-14T07:15:49Z",
        content:
          "It's all about clean energy, it seems. \r\nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoi… [+2508 chars]",
      },
      {
        source: {
          id: "mashable",
          name: "Mashable",
        },
        author: "Stan Schroeder",
        title:
          "Elon Musk says Tesla will resume Bitcoin purchases when Bitcoin gets greener",
        description:
          "It's all about clean energy, it seems. \nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoins and that it will start accepting Bitcoin for purchases, an…",
        url: "https://mashable.com/article/tesla-bitcoin-purchases-green/",
        urlToImage:
          "https://mondrian.mashable.com/2021%252F06%252F14%252Fcc%252Faf6b974e89a64972a334f8675f5dc80a.36e5a.jpg%252F1200x630.jpg?signature=XiWTfhyod6_Xl2i4nyhER_1xCXQ=",
        publishedAt: "2021-06-14T07:15:49Z",
        content:
          "It's all about clean energy, it seems. \r\nElon Musk and Tesla caused ripples in the cryptocurrency market in the past few months, first by announcing that Tesla had bought $1.5 billion worth of bitcoi… [+2508 chars]",
      },
    ],
  }

  const [_news, setNews] = useState([])

  useEffect(() => {
    setNews(placeholderData.articles)
  }, [])
  useEffect(() => {
    gsap.from(cardsParentRef.current.children, {
      stagger: 0.5,
      ease: "power4.out",
      x: -100,
      opacity: 0,
    })
  }, [_news])
  return (
    <div className='news-page-wrapper'>
      <h1 className='text-start h4 py-2 border-bottom '>Cryptocurrency news</h1>
      <div ref={cardsParentRef} className='news-cards-wrapper'>
        {_news.map((article, i) => (
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
