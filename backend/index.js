require("dotenv").config()
const api = require("binance")
const express = require("express")
const twilio = require("twilio")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5500
const axios = require("axios")
const API_KEY = process.env.COIN_API_KEY
const data = require("./example.json")
const CoinGecko = require("coingecko-api")
const { json } = require("express")
const CoinGeckoClient = new CoinGecko()
const binanceWS = new api.BinanceWS(true)
const streams = binanceWS.streams

// const openSocket = (arr) => {
//   arr.forEach((id) => {
//     binanceWS.onAggTrade(id, (data) => {
//       return `${data.symbol} : ${data.price}`
//     })
//   })
// }

const fetchCoinData = async () => {
  try {
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    return [data, events]

    // let ids = data.data.splice(0, 50).map((item) => `${item.symbol}usdt`)
    // console.log(openSocket(ids))
    // return [openSocket(ids), data]
  } catch (err) {
    console.log(err)
  }
}

app.use(express.json())

app.get("/api", async (req, res) => {
  res.send(await fetchCoinData())
})
app.listen(5500, () => console.log(`Server running on http://localhost:${PORT}`))

// const client = new twilio(accountSid, authToken)

// client.messages
//   .create({
//     body: "Hello from Node",
//     to: "+447468532992", // Text this number
//     from: "+14122754927", // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid))
