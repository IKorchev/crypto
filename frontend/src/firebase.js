import firebase from "firebase"

export const config = {
  apiKey: "AIzaSyBQm93ASu9oeveKdsZGwU60BB0wDd1iDnw",
  authDomain: "different-96334.firebaseapp.com",
  projectId: "different-96334",
  storageBucket: "different-96334.appspot.com",
  messagingSenderId: "894868313343",
  appId: "1:894868313343:web:6f54b81eb2ba0bcc8a28ca",
}

export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (user) => {
      if (user.additionalUserInfo.isNewUser) {
        console.log("new user")
      }
      return false
    },
  },
}
