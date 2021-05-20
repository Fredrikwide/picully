import React, { createContext, useState, useEffect, useContext } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';
export const FirebaseContext = createContext()

export const useFire = () => useContext(FirebaseContext)


export const FirebaseProvider = ({ children }) => {
  
  
  const db = firebase.firestore()
  const storage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [sharedUrl, setSharedUrl] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState()
  const [collectionData, setCollectionData] = useState([])
  const [albumCollection, setAlbumCollection] = useState([])
  const [created, setCreated] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const [images, setImages] = useState([])
  const [albums, setAlbums] = useState([])
  const {currentUser} = useAuth()
  const [updatedAlbumTitle, setUpdatedAlbumTitle] = useState(false)
  const [sharedAlbum, setSharedAlbum] = useState()

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
      user.id = currentUser !== null ? currentUser.uid : ''
      setUserData(user)
      setIsLoading(false)
      return user
    }, err => {
      console.log(err)
    })
    ,
    //create User
    createUser: async (firstname, lastname) => await db.collection('users').add({
      firstname,
      lastname,
      createdAt: timestamp()
    }).then(docRef => {
      const dataRef = db.collection("users").doc(docRef.id);
      return dataRef.update({
        id: currentUser !== null ? currentUser.uid : ''
     })
    }),
    //create album
    createAlbum: async (title, desc, ownerId, id) => {
      setIsLoading(true)
      setCreated(false)
      const num = uuidv4()
       await db.collection("albums").add({
        title,
        description: desc,
        owner_id: ownerId,
        images: [],
        sharedUrl: "",
        slug: title.replace(/\s+/g, '-').toLowerCase().trim() + `-${num}`,
        createdAt: timestamp(),
        key: num,
        docId: '',
        id
      }).then(ref => {
        ref.update({
          id: ref.id,
          docId: ref.id,
          key: uuidv4()
      }).catch(
       err => console.error("error", err)   
      )
      setIsLoading(false)
      setCreated(true)
      
      })    
    }
  ,
    createAlbumWithImages: async (title, desc, ownerId, id, images) => {
      const num = uuidv4()
      setIsLoading(true)
      setCreated(false)
      await db.collection("albums").add({
        title,
        description: desc,
        owner_id: ownerId,
        images,
        sharedUrl: "",
        slug: title.replace(/\s+/g, '-').toLowerCase().trim()+ `-${num}`,
        createdAt: timestamp(),
        key: num,
        docId: '',
        id
      }).then(ref => {
          ref.update({
            id: ref.id,
            docId: ref.id,
      })
      console.log('album created with images', images)
      setIsLoading(false)
      setCreated(true)
      
      })    
    }
    ,
    updateAlbumName: async (id, newName) => {
      let ref = db.collection("albums").doc(id)
      const num = uuidv4()
      setIsLoading(true)
      setUpdatedAlbumTitle(true)
      await ref.update({
        title: newName,
        slug: newName.replace(/\s+/g, '-').toLowerCase()+ `-${num}`,
      }).then(
        setIsLoading(false),
        setUpdatedAlbumTitle(false)
        
      ).catch(err => console.log("error", err))
 
    }
    ,
    updateAlbumSharedUrl: async (id, url) => {
      let ref = db.collection("albums").doc(id)
      setIsLoading(true)
      await ref.update({
        sharedUrl: `${url}`,
      }).then(
        setIsLoading(false),
        
      ).catch(err => console.log("error", err))
    }
    ,
    //get albums
    getUserAlbums: async (id) => await db.collection('albums').where("owner_id", "==", id).get().then((snapshot) => {
      setIsLoading(true)
      const albums = []

      snapshot.forEach((doc) => {
        albums.push(doc.data())
      });
      setAlbumCollection([...albums])
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
    getAlbumsByUrl: async (url) => await db.collection('albums').get().then((snapshot) => {
      setIsLoading(true)
      const albumArr = []
      snapshot.forEach((doc) => {
        if(doc.data().sharedUrl === url) {
          albumArr.push(doc.data())
        }
        setSharedAlbum(albumArr)
        setIsLoading(false)
        return albumArr
      })
      return false
    }, err => {
      console.log(err)
    }),
    getAlbumById: async (albumId) => {
      // get ref
      const albumIdRef = db.collection('albums')
      setIsLoading(true)
      albumIdRef
      .where('id', '==', albumId)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        })
        return items
      })
      
    },
    getSharedAlbumUrls: async () => await db.collection('albums').get().then((snapshot) => {
      setIsLoading(true)
      const albumArr = []
      snapshot.forEach((doc) => {
        if(doc.data().sharedUrl) {
          albumArr.push(doc.data().sharedUrl)
        }
      })
      setAlbums(albumArr)
      setIsLoading(false)
      return albumArr
    }, err => {
      console.log(err)
    })
    ,
    getImagesByAlbumId: async (id) => {
       db.collection("images").where("albums", "array-contains", id).get().then(querySnapshot => {
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
          console.log("image in current album", imageArr, id)
          // setImages([...imageArr])
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
    created,
    updatedAlbumTitle,
    setUpdatedAlbumTitle,
    images,
    albumCollection,
    updated,
    currentAlbum,
    storage,
    albums,
    setAlbums,
    setSharedUrl,
    sharedUrl
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
