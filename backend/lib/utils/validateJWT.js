const { getAuth } = require("firebase-admin/auth")
const validateJWT = async (jwt) => {
  try {
    const token = await getAuth().verifyIdToken(jwt)
    if (token && token.uid) {
      return true
    }
  } catch (error) {
    return false
  }
}

module.exports = {
  validateJWT,
}
