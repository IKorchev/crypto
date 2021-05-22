require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5500
const axios = require("axios")
const API_KEY = process.env.COIN_API_KEY
const URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=30"
const data = require("./example.json")

app.use(express.json())
const fetchData = async () => {
  const options = {
    headers: {
      //prettier-ignore
      "Accept": "application/json",
      "X-CMC_PRO_API_KEY": API_KEY,
      "Accept-Encoding": "deflate, gzip",
    },
  }
  try {
    const response = await axios.get(URL, options)
    return response.data
  } catch (err) {
    throw err
  }
}

app.get("/api", async (req, res) => {
  res.send(data)
  console.log([data])
})
app.listen(5500, () => console.log(`Server running on http://localhost:${PORT}`))
