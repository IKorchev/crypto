const { getAuth } = require("firebase-admin/auth")

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    const data = await getAuth().verifyIdToken(token)
    if (data.uid) {
      res.authenticated = true
      next()
      return
    }
  } catch (error) {
    res.authenticated = false
    next()
    return
  }
}
module.exports = {
  authenticate,
}
