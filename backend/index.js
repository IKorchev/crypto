require("dotenv").config()
const express = require("express")
const WebSocket = require("ws")
const twilio = require("twilio")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5500
const axios = require("axios")
const API_KEY = process.env.COIN_API_KEY
const data = require("./example.json")
const CoinGecko = require("coingecko-api")
const CoinGeckoClient = new CoinGecko()
const fetchCoinData = async () => {
  try {
    let data = await CoinGeckoClient.coins.markets()
    return data
  } catch (err) {
    console.log(err)
  }
}

socket.onopen = (event) => {
  console.log("socket opened")
}
// socket.onmessage = (e) => console.log(JSON.parse(e.data))
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
