import React, { useState, createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useFire } from './FirebaseContext';

export const UpdateContext = createContext();


export const useUpdate = () => useContext(UpdateContext)
  

export const UpdateProvider = props => {
    
    const [signUpIsClicked, setSignUpIsClicked] = useState(false)
    const [imageDeleted, setImageDeleted] = useState(false)
    const [currentAlbumID, setCurrentAlbumID] = useState(undefined)
    const [currentAlbum, setCurrentAlbum] = useState(undefined)
    const [currentUserAlbums, setCurrentUserAlbums] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const {firebaseFunctions, db} = useFire()
    const [isUploaded, setIsUploaded] = useState(false)
    const [pickedImages, setPickedImages] = useState([])
    const [sharedIamges, setSharedImages] = useState([])
    const [imagesInCurrentAlbum, setImagesInCurrentAlbum] = useState([])
    const [imagesOwnedByCurrentUser, setImagesOwnedByCurrentUser] = useState()
    const [albumToShare, setAlbumToShare] = useState(undefined)
    const {currentUser} = useAuth()
    const {created} = useFire()
    const [sharedUrl, setSharedUrl] = useState(false)
    useEffect(() => {
        ( async () => {
            if(currentUser !== null) {
                setCurrentUserAlbums("")
                console.log("I RAN")
                let res = await firebaseFunctions.getUserAlbums(currentUser.uid)
                console.log(res)
                setCurrentUserAlbums(res)
                let ref = db.collection("images").where("album", "==", currentUser.uid)
                ref.get().then(snapshot => {
                    let userImages = []
                    snapshot.forEach(doc => {
                        console.log(doc.data())
                        userImages.push(doc.data())
                        setImagesOwnedByCurrentUser(userImages)
                    })
                })
            }
            else return;
        }

        )()
        if(imageDeleted){
        setImageDeleted(false)
        }
        
    }, [userLoggedIn,isUploaded, imageDeleted, created])

    useEffect(() => {
        (async () => {
            if(albumToShare){
                await db.collection("images").where("albums", "array-contains", albumToShare.id).get().then(snapshot => {
                    snapshot.forEach(doc => {
                        console.log(doc.data())
                    })
                })
            }
        })()
       
    }, [albumToShare])

    const updateContextValue = {
        
      signUpIsClicked,
      setSignUpIsClicked,
      currentAlbumID,
      setCurrentUserAlbums,
      currentUserAlbums,
      setUserLoggedIn,
      userLoggedIn,
      imagesOwnedByCurrentUser,
      setCurrentAlbumID,
      imageDeleted,
      imagesInCurrentAlbum,
      setCurrentAlbum,
      currentAlbum,
      setImagesInCurrentAlbum,
      isUploaded,
      pickedImages,
      setPickedImages,
      setIsUploaded,
      setImageDeleted,
      setAlbumToShare,
      albumToShare,
      setSharedUrl,
      sharedUrl
    }

    return (
        <UpdateContext.Provider
            value=
            {updateContextValue}
        >
            {props.children}
        </UpdateContext.Provider>
    )
}