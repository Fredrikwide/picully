import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
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
      <Box>
          <Heading>Welcome Home {currentUser.email}</Heading>
        <Center>
          <Button onClick={handleSignOut}>Sign out</Button>
        </Center>
      </Box>
    </Flex>
  )
}

export default Home
