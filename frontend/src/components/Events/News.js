import NewsCard from "./NewsCard"
import { useStore } from "../../contexts/StoreContext"
const News = () => {
  const { news } = useStore()

  return (
    <div className='news-page-wrapper'>
      <h1 className='text-start h4 py-2 border-bottom '>Cryptocurrency news</h1>
      <div className='news-cards-wrapper'>
        {news?.map((article, i) => (
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
