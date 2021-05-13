import React, { useEffect, useState } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFire } from '../contexts/FirebaseContext'
import SharedAlbum from '../components/album/SharedAlbum'
import { useUpdate } from '../contexts/UpdateContext'
const AuthRoute = (props) => {
	const { currentUser } = useAuth()

	const { albumToShare, setAlbumToShare, renderShared, setRenderShared, currentUrl, setCurrentUrl } = useUpdate();
	const { firebaseFunctions, sharedAlbum, setSharedAlbum, sharedUrl, setSharedUrl } = useFire();

	const { getAlbumsByUrl, getSharedAlbumUrls, getImagesByAlbumId } = firebaseFunctions;
  const [sharedImages, setSharedImages] = useState([]);
  useEffect(() => {
    (async () => {
      const albums = await getSharedAlbumUrls();
      albums.forEach( async (url) => {
        if(currentUrl === url) {
          console.log("TRUE", url);
          setSharedUrl(url);
          await getAlbumsByUrl(url);
		
          setRenderShared(true);
        }
      })
    })()
  }, [])

	useEffect(() => {
		console.log(sharedAlbum, "SHARED")
	}, [sharedAlbum])

	return (
			currentUser 
			? (<Route {...props} />)
			: (!currentUser && renderShared) &&
			(<Navigate to={`/${sharedAlbum.slug}`} album={sharedAlbum} images={sharedImages}/>)

		)
}

export default AuthRoute
