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
          id: doc.data().id,
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
        last_name: '',
        id: '',
      }
      user.first_name = doc.data().firstname
      user.last_name = doc.data().lastname
      user.id = doc.data().id
      setUserData({...user})
      console.log(user)
      setIsLoading(false)
      return user
    }, err => {
      console.log(err)
    })
    ,
    createUser: async (firstname, lastname) => await db.collection('users').add({
      firstname,
      lastname,
    }).then(docRef => {
      const dataRef = db.collection("users").doc(docRef.id);
      return dataRef.update({
        id: dataRef.id
     })
    }),
    //create album
    createAlbum: async (name, desc, id) => await db.collection("albums").add({
      title: name,
      description: desc,
      owner_id: id,
      
    }).then(docRef => {
      const dataRef = db.collection("albums").doc(docRef.id);
      return dataRef.update({
        id: dataRef.id
     })
    })
  ,
      //get albums
    getUserAlbums: async () => await db.collection('albums').get().then((snapshot) => {
      setIsLoading(true)
      const albums = []
      const ref = db.collection('albums').doc();
      snapshot.forEach((doc) => {
        
        albums.push({
          name: doc.data().title,
          description: doc.data().description,
          ownderId: doc.data().owner_id,
          id: ref.id
        })
      });
      console.log("album info", albums)
      setCollectionData([...albums])
      setIsLoading(false)
      return albums
    }, err => {
      console.log(err)
    }),
    getAlbumByTitle: async (name) => await db.collection('albums').where('title', '==', name).get().then(doc => {
      setIsLoading(true)
      const album = {
        title: '',
        owner_id: '',
        description: '',
        id: '',
      }
      album.title = doc.data().title
      album.description = doc.data().description
      album.owner_id = doc.data().owner_id
      album.id = doc.data().id
      setIsLoading(false)
      return album
    }, err => {
      console.log(err)
    })
    ,
    //get ablum by album id
    getAlbumById: async (id) => await db.collection('albums').where('id', '==', id).get().then(doc => {
      setIsLoading(true)
      const album = {
        title: '',
        owner_id: '',
        description: '',
        id: '',
      }
      album.title = doc.data().title
      album.description = doc.data().description
      album.owner_id = doc.data().owner_id
      album.id = doc.data().id
      setIsLoading(false)
      return album
    }, err => {
      console.log(err)
    })

    ,
    //get images from collection
    getImages: async () => await db.collection('images').get().then((snapshot) => {
      setIsLoading(true)
      const imageArr = []
      snapshot.forEach((doc) => {
        imageArr.push({
          title: doc.data().title,
          path: doc.data().path,
          size: doc.data().size,
          ownderId: doc.data().owner_id,
          url: doc.data().url
        })
      });
      console.log("image info", imageArr)
      setCollectionData([...imageArr])
      setIsLoading(false)
      return imageArr
    }, err => {
      console.log(err)
    })
    ,
    getImagesByOwnerId: async (id) => await db.collection('images').where("ownerId", "==", id).get().then((snapshot) => {
      setIsLoading(true)
      const imageArr = []
      snapshot.forEach((doc) => {
        imageArr.push({
          title: doc.data().title,
          path: doc.data().path,
          ownderId: doc.data().owner,
        })
      });
      console.log("image info", imageArr)
      setCollectionData([...imageArr])
      setIsLoading(false)
      return imageArr
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
