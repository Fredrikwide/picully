import React, { createContext, useState, useEffect, useContext } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

export const FirebaseContext = createContext()

export const useFire = () => useContext(FirebaseContext)


export const FirebaseProvider = ({ children }) => {
  

  const db = firebase.firestore()
  const storage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [currentAlbum, setCurrentAlbum] = useState()
  const [collectionData, setCollectionData] = useState([])
  const [albumCollection, setAlbumCollection] = useState([])
  const [updated, setUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const [images, setImages] = useState([])

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
        firstName: '',
        lastName: '',
        id: '',
      }
      user.firstName = doc.data().firstName
      user.lastName = doc.data().lastName
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
      id
      
    }).then(docRef => {
      const dataRef = db.collection("albums").doc(docRef.id);
      return dataRef.update({
        id: dataRef.id
     })
    })
  ,
    updateAlbumName: async (id, newName) => {
      let ref = db.collection("albums").doc(id)
      setIsLoading(true)
      await ref.update({
        title: newName
      }).then(
        console.log("success")
      ).catch(err => console.log("error", err))

    },
      //get albums
    getUserAlbums: async (id, title) => await db.collection('albums').where("owner_id", "==", id).get().then((snapshot) => {
      setIsLoading(true)
      const albums = []
      const ref = db.collection('albums')
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
    getAlbumByTitle: async (name) => {
     await db.collection('albums').where('title', '==', name).get().then(snapshot => {
        snapshot.forEach(doc => {
          const tempAlbums = []
          let tempObj = doc.id
          tempAlbums.push(doc.data())
          setAlbumCollection(tempAlbums)
          setCurrentAlbum(tempObj)
          setIsLoading(false)
          return tempObj
        })          
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
    ,
    //get ablum by album id
    getAlbumById: async (albumId) => {
      // get ref
      const albumIdRef = db.collection('albums')
      setIsLoading(true)
      albumIdRef
      .where('id', '==', albumId)
      //.where('title', '==', 'School1') // does not need index
      //.where('score', '<=', 10)    // needs index
      //.orderBy('owner', 'asc')
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        })
        console.log(items)
        return items
      })
      
  }

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
      })
      setCollectionData([...imageArr])
      setIsLoading(false)
      return imageArr
    }, err => {
      console.log(err)
    })
    ,
    getImagesByAlbumId: async (id) => { await db.collection("images").where("album", "==", db.collection("albums").doc(id)).get().then(querySnapshot => {
        const imageArr = []
        querySnapshot.forEach(doc => {
            imageArr.push({
              title: doc.data().title,
              album: doc.data().album,
              path: doc.data().path,
              size: doc.data().size,
              url: doc.data().url
            })
          })
          setImages([...imageArr])
          setIsLoading(false)
          return imageArr
        })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    },
     
  }


  const firebaseContextValue = {
    firebaseFunctions,
    collectionData,
    userData,
    isLoading,
    timestamp,
    db,
    images,
    albumCollection,
    updated,
    currentAlbum,
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
