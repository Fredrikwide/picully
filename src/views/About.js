import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import HoldingPhone from '../images/illustrations/holding-phone-colour-400px.png'
const About = () => {
  return (
    <Box 
    minH={["100vh", "100vh", "100vh", "100vh"]} 
    minW={["100vw", "100vw", "100vw", "100vw"]}
    borderTop="4px"
    borderLeft="4px"
    borderColor="teal.500"
    overflow="hidden"
    >
      <Flex w="100%" justifyContent="space-between" align="center" >
        <Box p="20px" mt="4rem" ml="10rem">
          <Image src={`${HoldingPhone}`} alt="Segun Adebayo" w="400px" h="400px"/>
        </Box>
        <Box maxW="400px" overflow="hidden">
          <Container>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quia id fugiat ut, eum sequi atque incidunt harum doloribus! Alias.</Text>
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}

export default About


