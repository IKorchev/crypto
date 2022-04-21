require("dotenv").config()
const url = require("url")
const path = require("path")
const { authenticate } = require("./middleware")
const { yesterdaysDate } = require("./lib/utils/yesterdaysDate")
const { validateJWT } = require("./lib/utils/validateJWT")
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
const newsUrl = `https://newsapi.org/v2/everything?q=bitcoin&from=${yesterdaysDate()}&language=en&apiKey=${
  process.env.NEWS_API_KEY
}`

//firebase admin used to validate the jwt
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
})

//middleware
app.use(cors())
app.use(authenticate)
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")))

//websocket
app.ws("/ws", async (ws, req) => {
  const token = url.parse(req.url.toString(), true /* parse query string */).query.token
  const isValid = await validateJWT(token)
  console.log(isValid)
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

//All data in 1 route
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

//serving the index file
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html")
})


app.listen(PORT)
