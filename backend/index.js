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
const { yesterdaysDate } = require("./lib/utils/yesterdaysDate")

console.log(yesterdaysDate())
app.use(express.json())
const server = app.listen(5500)
const socket = new Server({ server: server })
const url = `https://newsapi.org/v2/everything?q=bitcoin&from=${yesterdaysDate()}&language=en&apiKey=${NEWS_API_KEY}`

const fetchCoinData = async () => {
  try {
    const news = await axios.get(url)
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    return [data, events, news.data.articles]
  } catch (err) {
    console.log(err)
  }
}

//real time prices and trades
socket.on("connection", async (clientSocket) => {
  try {
    client.ws.trades(["BTCUSDT", "ETHUSDT"], (event) => {
      clientSocket.send(JSON.stringify(event))
    })
    client.ws.futuresCustomSubStream(["!ticker@arr"], (event) => {
      clientSocket.send(JSON.stringify(event))
    })
    client.ws.futuresCustomSubStream(["!forceOrder@arr"], (event) => {
      clientSocket.send(JSON.stringify(event))
    })
  } catch (err) {
    console.log(err)
    client.send(err)
  }
})

app.get("/data", async (req, res) => {
  try {
    const data = await fetchCoinData()
    res.send(data)
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})
