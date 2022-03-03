require("dotenv").config()
const url = require("url")
const { getAuth } = require("firebase-admin/auth")
const { authenticate } = require("./middleware")
const admin = require("firebase-admin")
const express = require("express")
const cors = require("cors")
const expressWs = require("express-ws")
const app = expressWs(express(), undefined, { wsOptions: { clientTracking: true } }).app
const PORT = process.env.PORT || 5500
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const Binance = require("binance-api-node").default
const client = Binance()
const axios = require("axios")
const NEWS_API_KEY = process.env.NEWS_API_KEY
const { yesterdaysDate } = require("./lib/utils/yesterdaysDate")
const newsUrl = `https://newsapi.org/v2/everything?q=bitcoin&from=${yesterdaysDate()}&language=en&apiKey=${NEWS_API_KEY}`

app.use(cors())
app.use(authenticate)
app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
})

const isTokenValid = async (jwt) => {
  try {
    const token = await getAuth().verifyIdToken(jwt)
    if (token && token.uid) {
      return true
    }
  } catch (error) {
    return false
  }
}
app.ws("/ws", async (ws, req) => {
  const token = url.parse(req.url.toString(), true /* parse query string */).query.token
  const isValid = await isTokenValid(token)
  if (!isValid) {
    ws.close()
  }
  client.ws.trades(["BTCUSDT", "ETHUSDT"], (event) => {
    ws.send(JSON.stringify(event))
  })
  client.ws.futuresCustomSubStream(["!ticker@arr"], (event) => {
    ws.send(JSON.stringify(event))
  })
  client.ws.futuresCustomSubStream(["!forceOrder@arr"], (event) => {
    ws.send(JSON.stringify(event))
  })
})
app.get("/events", async (req, res) => {
  try {
    const newsResponse = await axios.get(newsUrl)
    const coinsResponse = await CoinGeckoClient.coins.markets()
    const eventsResponse = await CoinGeckoClient.events.all()
    const data = coinsResponse.data
    const events = eventsResponse.data.data
    const news = newsResponse.data.articles
    res.send([data, events, news])
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

//real time prices and trades
app.listen(PORT)
