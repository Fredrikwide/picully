import React, { useState, createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SharedAlbum from '../components/album/SharedAlbum';
import { useAuth } from './AuthContext';
import { useFire } from './FirebaseContext';

export const UpdateContext = createContext();


export const useUpdate = () => useContext(UpdateContext)
  

export const UpdateProvider = props => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const [signUpIsClicked, setSignUpIsClicked] = useState(false)
    const [imageDeleted, setImageDeleted] = useState(false)
    const [albumDeleted, setAlbumDeleted] = useState(false)
    const [currentAlbumID, setCurrentAlbumID] = useState(undefined)
    const [currentAlbum, setCurrentAlbum] = useState(undefined)
    const [currentUserAlbums, setCurrentUserAlbums] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const {firebaseFunctions, db} = useFire()
    const [isUploaded, setIsUploaded] = useState(false)
    const [pickedImages, setPickedImages] = useState([])
    const [discardedImages, setDiscardedImages] = useState([])
    const [sharedIamges, setSharedImages] = useState([])
    const [imagesInCurrentAlbum, setImagesInCurrentAlbum] = useState([])
    const [imagesOwnedByCurrentUser, setImagesOwnedByCurrentUser] = useState()
    const [albumToShare, setAlbumToShare] = useState('')
    const {currentUser} = useAuth()
    const {created} = useFire()
    const [renderShared, setRenderShared] = useState(false);
    const [userSelectedImagesToKeep, setuserSelectedImagesToKeep] = useState([])
    const [userSelectedImagesToDelete, setuserSelectedImagesToDelete] = useState([])

    useEffect(() => {
        ( async () => {
            if(currentUser !== null && currentUser) {
                setCurrentUserAlbums([])
                let res = await firebaseFunctions.getUserAlbums(currentUser.uid)
                setCurrentUserAlbums(res)
            }
        }
        )()
    }, [userLoggedIn,albumDeleted,isUploaded,created])

    const updateContextValue = {
        
      signUpIsClicked,
      setSignUpIsClicked,
      currentAlbumID,
      setCurrentUserAlbums,
      currentUserAlbums,
      setUserLoggedIn,
      userLoggedIn,
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
      sharedIamges,
      setSharedImages,
      discardedImages,
      setDiscardedImages,
      userSelectedImagesToKeep, 
      setuserSelectedImagesToKeep,
      userSelectedImagesToDelete,
      albumDeleted, 
      setAlbumDeleted,
      setuserSelectedImagesToDelete,
      renderShared, 
      setRenderShared,
      currentUrl, 
      setCurrentUrl
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