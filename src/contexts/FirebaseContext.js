import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
  

  const db = firebase.firestore()
  const [collectionData, setCollectionData] = useState([])

  const firebaseFunctions = {
    GetCollection: async collection => await db.collection(collection).get().then((snapshot) => {
      const userData = []
      snapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          username: doc.data().name,
         
        })
      });
      console.log("restaurants after map", userData)
      setCollectionData([...userData])
      return userData
    })
    ,
    getSingle: async (collection, id) => await db.collection(collection).doc(id).get()
    ,
    PostUserInfo: async (firstname, lastname) => await db.collection("users").add({
      firstname: firstname,
      lastname: lastname
  })


  }

  const firebaseContextValue = {
    firebaseFunctions,
    collectionData
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
