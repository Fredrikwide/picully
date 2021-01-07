import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Console from "../components/console/Console"
import SignIn from "../components/forms/SignIn"
import Welcome from "../components/Welcome"
import { useAuth } from "../contexts/AuthContext"

const Home = () => {
  const {currentUser, logout} = useAuth()


  const navigate= useNavigate()
  const handleSignOut = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <Flex justify="center" align="center" h="100vh" >
      <Box h="100vh" w="100vw" border="2px" borderColor="green" >
        <Welcome />
      </Box>
    </Flex>
  )
}

export default Home
