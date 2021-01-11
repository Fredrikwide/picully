import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
  
  const db = firebase.firestore()
  
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [collectionData, setCollectionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const firebaseFunctions = {
    getUserCollection: async () => await db.collection('users').get().then((snapshot) => {
      setIsLoading(true)
      const userData = []
      snapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
        })
      });
      console.log("user info", userData)
      setCollectionData([...userData])
      setIsLoading(false)
      return userData
    })
    ,
    getUser: async (id) => await db.collection('users').doc(id).get().then(doc => {
      setIsLoading(true)
      const user = {
        first_name: '',
        last_name: ''
      }
      user.first_name = doc.data().firstname
      user.lastname = doc.data().lastname
      setUserData({...user})
      console.log(user)
      setIsLoading(false)
      return user
    }),

    createAlbum: async (albumName, id) => await db.collection("albums").doc(albumName).set({
      name: albumName,
      owner: id
    })
  }


  const firebaseContextValue = {
    firebaseFunctions,
    collectionData,
    userData,
    isLoading,
    timestamp,
    db
  }

  return (
    <FirebaseContext.Provider
      value=
      {firebaseContextValue}
    >
      {children}
    </FirebaseContext.Provider >
  )
}
