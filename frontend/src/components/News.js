import React, { useEffect, useState } from "react"
import { useStore } from "../contexts/StoreContext"
const News = () => {
  const { news } = useStore()
  const [_news, setNews] = useState(null)
  useEffect(() => {
    news && setNews(news.articles)

    console.log(_news)
  }, [news, _news])
  return (
    <div className='news-page-wrapper'>
      {_news &&
        _news.map((article, i) => (
          <div key={i}>
            <h1>{article.title}</h1>
            <span>Author: {article.author || "unknown"}</span>
            <span>Source: {article.source.name}</span>
            <a href={article.url} target='_blank' rel='noreferrer'>
              <img
                src={article.urlToImage}
                height='200px'
                width='auto'
                alt='Article'></img>
            </a>
            <p>{article.description}</p>
          </div>
        ))}
    </div>
  )
}

export default News
