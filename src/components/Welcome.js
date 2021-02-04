import { Box, Flex  } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { UpdateContext } from '../contexts/UpdateContext'

import SignIn from './forms/SignIn'
import SignUp from './forms/SignUp'
import WelcomeBanner from './Hero/WelcomeBanner'

const Welcome = () => {

  const {signUpIsClicked} = useContext(UpdateContext)
  return (
  
      <Flex justify="space-around" align="center" direction={["column", "column", "column", "row"]}>
          <WelcomeBanner />
          <Box
            overflow="hidden"
            ml="auto"
            pb={["sm", "md", "lg", "16px"]}
            bgGradient="linear(to-b, teal.600, teal.200)"
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
}

export default Welcome
