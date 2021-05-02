import { Box, Button, Center, Flex, Heading, Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Albums from "../components/album/AlbumGrid"
import Console from "../components/console/Console"
import SignIn from "../components/forms/SignIn"
import Welcome from "../components/Welcome"
import { useAuth } from "../contexts/AuthContext"
import { FirebaseContext } from "../contexts/FirebaseContext"
import About from "./About"

const Home = () => {
  const {currentUser, logout} = useAuth()
  const {isLoading} = useContext(FirebaseContext)

  const navigate= useNavigate()
  const { sharedUrl } = useUpdate()

  const [renderShared, setRenderShared] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href)
  
  useEffect(() => {
    if(currentUrl === sharedUrl) {
      setRenderShared(true);
    }
    else {
      setRenderShared(false);
    }
  }, [sharedUrl])

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
        : 
        <Albums signOut={handleSignOut} />}
      </>
  )
}

export default Home
