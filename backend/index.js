require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5500
const axios = require("axios")
const API_KEY = process.env.COIN_API_KEY
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const WebSocket = require("ws")

const fetchCoinData = async () => {
  try {
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    return [data, events]
  } catch (err) {
    console.log(err)
  }
}

app.use(express.json())

app.get("/api", async (req, res) => {
  res.send(await fetchCoinData())
})
app.listen(5500, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

