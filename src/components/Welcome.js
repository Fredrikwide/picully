import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Welcome = () => {
  return (
    <>
      <Flex justify="center" align="center" h="xl">
        <Box>
          <Heading 
            as="h1" 
            size="4xl" 
            isTruncated 
            bgGradient="linear(to-l, teal.500,teal.200)"
            bgClip="text"
            fontSize={["sm", "md", "lg", "6xl"]}
            fontWeight="extrabold"
          >
            Welcome to picully
          </Heading>
          <Box mt="16px" ml="10px">
            <Text as="i" color="teal.500" fontSize={["sm", "md", "lg", "xl"]}>
              &quot;The best app for photograpers and clients&quot;
            </Text>
          </Box>
        </Box>
      </Flex> 
    </>
  )
}

export default Welcome
