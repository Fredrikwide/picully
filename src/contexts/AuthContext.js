import React, { useContext, useState, useEffect } from "react"
import { auth } from "../config/firebase"
import { useFire } from "./FirebaseContext"

const AuthContext = React.createContext()



export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const {firebaseFunctions} = useFire()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password, firstname, lastname) => {
     auth.createUserWithEmailAndPassword(email, password).then( async user => {
       let tempUser={}
       tempUser = await firebaseFunctions.createuser(firstname, lastname)
       console.log(user, tempUser)
      return tempUser
    })
  }

  const login = (email, password) => auth.signInWithEmailAndPassword(email, password)


  const logout = () => {
    return auth.signOut()
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
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
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
