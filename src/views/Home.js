import { Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Albums from "../components/album/AlbumGrid"
import Welcome from "../components/Welcome"
import { useAuth } from "../contexts/AuthContext"
import { FirebaseContext, useFire } from "../contexts/FirebaseContext"
import { useUpdate } from "../contexts/UpdateContext"
import SharedAlbum from '../components/album/SharedAlbum'

const Home = () => {
  const {currentUser, logout} = useAuth()

  const { albumToShare, setAlbumToShare,renderShared, setRenderShared, currentUrl, setCurrentUrl } = useUpdate();
  const { firebaseFunctions, sharedAlbum, setSharedAlbum, sharedUrl, setSharedUrl , isLoading} = useFire();
  const { getAlbumsByUrl, getSharedAlbumUrls, getImagesByAlbumId } = firebaseFunctions;
  const [sharedImages, setSharedImages] = useState([]);
  const navigate= useNavigate()



  useEffect(() => {
    (async () => {
      const albums = await getSharedAlbumUrls();
      albums.forEach( async (url) => {
        if(currentUrl === url) {
          console.log("TRUE", url);
          setSharedUrl(url);
          getAlbumsByUrl(url);
          setRenderShared(true);

        }
      })
    })()
  }, [currentUrl, sharedUrl])
  const handleSignOut = () => {
    logout()
    navigate('/sign-in')
  }

  return (
      <>
        { 

        !currentUser && !renderShared ?
        <Welcome /> 
        : 
        isLoading ? 
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        /> 
        : renderShared ?
        <SharedAlbum album={sharedAlbum} images={sharedImages} />
        :
        <Albums signOut={handleSignOut} />}
      </>
  )
}

export default Home
