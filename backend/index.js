require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const { Server } = require("ws")
const Binance = require("binance-api-node").default
const client = Binance()
app.use(express.json())
const server = app.listen(5500, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
const socket = new Server({ server: server })

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
  } catch (err) {
    console.log(err)
    client.send(err)
  }
})

app.get("/api", async (req, res) => {
  res.send(await fetchCoinData())
})
