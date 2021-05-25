require("dotenv").config()
const express = require("express")
const twilio = require("twilio")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5500
const axios = require("axios")
const API_KEY = process.env.COIN_API_KEY
const URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=30"
const data = require("./example.json")

const accountSid = "ACb4a7105efdbf0dd6ecfe56753929627b" // Your Account SID from www.twilio.com/console
const authToken = "0bc959437678f6cf56222acf581b6318" // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken)

// client.messages
//   .create({
//     body: "Hello from Node",
//     to: "+447468532992", // Text this number
//     from: "+14122754927", // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid))

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
})
app.listen(5500, () => console.log(`Server running on http://localhost:${PORT}`))
