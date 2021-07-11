require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const WebSocket = require("ws")
const Binance = require("binance-api-node").default
const client = Binance()
const socket = new WebSocket.Server({ port: 5501 })
app.use(express.json())

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
socket.on("connection", async (e) => {
  try {
    client.ws.futuresCustomSubStream(["!ticker@arr"], (data) => {
      e.send(JSON.stringify(data))
    })
  } catch (err) {
    e.send(err)
  }
})
const getList = async () => {
  try {
    const [res1, res2] = await fetchCoinData()
    let newArr = res1.filter((item) => {
      return item.symbol !== "usdt" || item.symbol !== "usdc" || item.symbol !== "busd"
    })
    return newArr.map((item) => `${item.symbol.toUpperCase()}USDT`)
  } catch (err) {
    throw err
  }
}

app.get("/api", async (req, res) => {
  res.send(await fetchCoinData())
})
app.listen(5500, () => console.log(`Server running on http://localhost:${PORT}`))
