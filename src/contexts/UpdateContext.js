import React, { useState, createContext, useContext, useEffect } from 'react'
import { useAuth } from './AuthContext';
import { useFire } from './FirebaseContext';

export const UpdateContext = createContext();


export const useUpdate = () => useContext(UpdateContext)
  

export const UpdateProvider = props => {
    
    const [signUpIsClicked, setSignUpIsClicked] = useState(false)
    const [imageDeleted, setImageDeleted] = useState(false)
    const [currentAlbumID, setCurrentAlbumID] = useState(undefined)
    const [currentUserAlbums, setCurrentUserAlbums] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const {firebaseFunctions, db} = useFire()
    const [isUploaded, setIsUploaded] = useState(false)
    const [imagesInCurrentAlbum, setImagesInCurrentAlbum] = useState()
    const [imagesOwnedByCurrentUser, setImagesOwnedByCurrentUser] = useState()
    const {currentUser} = useAuth()

    useEffect(() => {
        ( async () => {
            if(currentUser !== null) {
                let res = await firebaseFunctions.getUserAlbums(currentUser.uid)
                setCurrentUserAlbums(res)
                let ref = db.collection("images").where("owner", "==", currentUser.uid)
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
        
    }, [userLoggedIn,isUploaded, imageDeleted])


    useEffect(() => {
        ( async () => {
            if(currentAlbumID !== undefined) {
                let ref = db.collection("images").where("album", "==", currentAlbumID)
            await ref.get().then(snapshot => {
                    let albumImages = []
                    snapshot.forEach(doc => {
                        console.log(doc.data(), "I RAN")
                        albumImages.push(doc.data())
                        setImagesInCurrentAlbum(albumImages)
                    })
                })
            }
            else return;
        }

        )()
    }, [currentAlbumID])


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
      setIsUploaded,
      setImageDeleted
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