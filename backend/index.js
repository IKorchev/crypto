require("dotenv").config()
const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const { Server } = require("ws")
const Binance = require("binance-api-node").default
const client = Binance()
const axios = require("axios")
const NEWS_API_KEY = process.env.NEWS_API_KEY
//make date for the api url
const yesterdaysDate = () => {
  const today = new Date()
  const month = today.getMonth() + 1
  const yesterday = today.getDate() - 1
  const year = today.getFullYear()
  const format_month = month > 10 ? month : `0${month}`
  return `${year}-${format_month}-${yesterday}`
}
console.log(yesterdaysDate())
app.use(express.json())
const server = app.listen(5500, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
const socket = new Server({ server: server })

const fetchCoinData = async () => {
  try {
    const news = await axios.get(
      `https://newsapi.org/v2/everything?q=bitcoin&from=${yesterdaysDate()}&language=en&apiKey=${NEWS_API_KEY}`
    )
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    return [data, events, news.data.articles]
  } catch (err) {
    console.log(err)
  }
}

//prettier-ignore
socket.on("connection", async (clientSocket) =>  {
  try {
    client.ws.trades(["BTCUSDT", "ETHUSDT"], event => {
      clientSocket.send(JSON.stringify(event))
    })
    client.ws.futuresCustomSubStream(["!ticker@arr" ],
     (event) => {
      clientSocket.send(JSON.stringify(event)
       )
      }
    )
    client.ws.futuresCustomSubStream(["!forceOrder@arr" ],
     (event) => {
      clientSocket.send(JSON.stringify(event)
       )
      }
    )
  } catch (err) {
    console.log(err)
    client.send(err)
  }
})
app.use(express.static(path.join(__dirname, "build")))
app.get("/", (req, res) => {
  res.sendFile("index.html")
})
app.get("/data", async (req, res) => {
  res.send(await fetchCoinData())
})
