import React, { useContext, useState, useEffect,createContext } from "react"
import { auth } from "../config/firebase"
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";
import firebase from "firebase/app";
const AuthContext = createContext()



export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children }) => {
  const db = firebase.firestore()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password, firstname, lastname) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
     return db.collection('users').doc(cred.user.uid).set({
       firstName: firstname,
       lastName: lastname,
     })
 })
 }

  const login = (email, password) => { 
    try {
      auth.signInWithEmailAndPassword(email, password);
    }
    catch (err) {
        console.log("failed to log in", err);
    }
  }

  const logout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
