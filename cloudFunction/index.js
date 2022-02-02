require("dotenv").config()
const cors = require("cors")
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

//make date for the api url
const yesterdaysDate = () => {
  const today = new Date()
  const month = today.getMonth() + 1
  const yesterday = today.getDate() - 1
  const year = today.getFullYear()
  const format_month = month > 10 ? month : `0${month}`
  return `${year}-${format_month}-${yesterday}`
}

process.env.APP_URL
console.log(process.env.APP_URL)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${process.env.APP_URL}`)
  next()
})
app.use(cors({ origin: `${process.env.APP_URL}` }))
const server = app.listen(PORT)
const socket = new Server({ server: server })

//prettier-ignore
const fetchCoinData = async () => {
  try {
    const news = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&from=${yesterdaysDate()}&language=en&apiKey=${process.env.NEWS_API_KEY}`)
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    return [data, events, news.data.articles]
  } catch (err) {
    console.log(err)
  }
}

app.get("/data", async (req, res) => {
  try {
    const data = await fetchCoinData()
    if (!data) res.sendStatus(500)
    res.send(data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

//prettier-ignore
socket.on("connection", async (clientSocket) =>  {
  console.log('new connection');
  try {
  client.ws.trades(["BTCUSDT"], event => {
     clientSocket.send(JSON.stringify(event))})
  client.ws.futuresCustomSubStream(["!ticker@arr" ],(event) => clientSocket.send(JSON.stringify(event)))
  client.ws.futuresAllLiquidations((event) => clientSocket.send(JSON.stringify(event)))
  } catch (err) {
    clientSocket.send(err)
  }
})
