import React, { createContext, useState, useEffect, useContext } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

export const FirebaseContext = createContext()

export const useFire = () => {
  return useContext(FirebaseContext)
}

export const FirebaseProvider = ({ children }) => {
  

  const db = firebase.firestore()
  const storage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [collectionData, setCollectionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const firebaseFunctions = {
    //get user collection
    getUsers: async () => await db.collection('users').get().then((snapshot) => {
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
    }, err => {
      console.log(err)
    })
    ,
    //get a user by id
    getUser: async (id) => await db.collection('users').doc(id).get().then(doc => {
      setIsLoading(true)
      const user = {
        first_name: '',
        last_name: ''
      }
      user.first_name = doc.data().firstname
      user.last_name = doc.data().lastname
      setUserData({...user})
      console.log(user)
      setIsLoading(false)
      return user
    }, err => {
      console.log(err)
    })
    ,
    //create album
    createAlbum: async (name, desc, id) => await db.collection("albums").doc().set({
      title: name,
      description: desc,
      owner_id: id,
      
    }, err => {
      console.log(err)
    })
    ,
    //get albums
    getUserAlbums: async (id) => db.collection('albums').get().then((snapshot) => {
      setIsLoading(true)
      const albums = []
      snapshot.forEach((doc) => {
        albums.push({
          name: doc.data().name,
          description: doc.data().description,
          ownderId: doc.data().owner,
        })
      });
      console.log("album info", albums)
      setCollectionData([...albums])
      setIsLoading(false)
      return albums
    }, err => {
      console.log(err)
    }),
    getUserAlbumsById: async (id) => db.collection('albums').doc(id).get().then((snapshot) => {
      setIsLoading(true)
      const albums = []
      snapshot.forEach((doc) => {
        albums.push({
          name: doc.data().name,
          description: doc.data().description,
          ownderId: doc.data().owner,
        })
      });
      console.log("album info", albums)
      setCollectionData([...albums])
      setIsLoading(false)
      return albums
    }, err => {
      console.log(err)
    })
  }


  const firebaseContextValue = {
    firebaseFunctions,
    collectionData,
    userData,
    isLoading,
    timestamp,
    db,
    storage
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
