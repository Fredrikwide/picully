import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UpdateContext } from '../contexts/UpdateContext'
import Console from './console/Console'
import SignIn from './forms/SignIn'
import SignUp from './forms/SignUp'
import WelcomeBanner from './Hero/WelcomeBanner'

const Welcome = () => {
  const {currentUser} = useAuth()
  const {signUpIsClicked} = useContext(UpdateContext)
  return (
    <>
    { !currentUser ?
     (
      <Flex justify="space-around" align="center" direction={["column", "column", "column", "row"]}>
          <WelcomeBanner />
          <Box
            overflow="hidden"
            ml="auto"
            pb={["sm", "md", "lg", "16px"]}
            background="teal.500"
            display="flex"
            alignContent="center"
            justifyContent="center"
            minH={["sm", "md", "lg", "100vh"]}
            minW={["100%","100%", "100%", "xl"]}
            maxW={["100%", "100%", "100%", "100%"]} 
            textAlign="center" 
            >
           { !signUpIsClicked ? <SignIn /> : <SignUp /> }
          </Box>
 
      </Flex>
     )
     :
     <Console />
    }
    </>
  )
}

export default Welcome
