import firebase from "firebase/app"
import "firebase/storage"
import "firebase/auth"
// Initialize Firebase

const app = firebase.initializeApp({
  apiKey: "AIzaSyAJ8_x5pcYoJHVimiLLLw7csbWKwNJ0CtI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const projectStorage = app.storage()
export const auth = app.auth()
export default app