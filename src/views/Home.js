import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Console from "../components/console/Console"
import SignIn from "../components/forms/SignIn"
import Welcome from "../components/Welcome"
import { useAuth } from "../contexts/AuthContext"
import About from "./About"

const Home = () => {
  const {currentUser, logout} = useAuth()


  const navigate= useNavigate()
  const handleSignOut = () => {
    logout()
    navigate('/sign-in')
  }

  return (
      <>
        <Welcome />
        {/* <About /> */}
      </>
  )
}

export default Home
