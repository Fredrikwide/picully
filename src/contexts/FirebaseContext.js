import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
  const ImageStorage = firebase.storage()
  const db = firebase.firestore()
  const [collectionData, setCollectionData] = useState([])

  const firebaseFunctions = {

    getCollection: async collection => await db.collection(collection).get().then((snapshot) => {
      const data = []
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description
        })
      });
      console.log("restaurants after map", data)
      setCollectionData([...data])
      return data
    }),
    getSingle: async (collection, id) => await db.collection(collection).doc(id).get()

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
