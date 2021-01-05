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
      const restaurants = []
      snapshot.forEach((doc) => {
        restaurants.push({
          id: doc.id,
          name: doc.data().name,
          coordinates: {
            latitude: doc.data().coordinates.latitude,
            longitude: doc.data().coordinates.longitude
          },
          description: doc.data().description,
          address: {
            street: doc.data().adress.street,
            city: doc.data().adress.city,
            zip: doc.data().adress.zip,
            full: `${doc.data().adress.street},${doc.data().adress.zip}, ${doc.data().adress.city}`
          },
          links: {
            facebook: doc.data().links.facebook,
            instagram: doc.data().links.instagram,
            twitter: doc.data().links.twitter,
            website: doc.data().links.website
          }
        })
      });
      console.log("restaurants after map", restaurants)
      setCollectionData([...restaurants])
      return restaurants
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
