import firebase from "firebase"
import { useAuth } from "../contexts/AuthContext"
export const useUiConfig = () => {
  const { store } = useAuth()
  const config = {
    callbacks: {
      signInSuccessWithAuthResult: (auth) => {
        if (auth.additionalUserInfo.isNewUser) {
          store.collection("users").doc(auth.user.uid).set({
            cryptos: [],
          })
        }
        return true
      },
    },
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      {
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }

  return { config }
}
