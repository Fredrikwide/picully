import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import HoldingPhone from '../images/illustrations/holding-phone-colour-400px.png'
import Photographer from '../images/illustrations/photographer-colour-400px.png'
import office from '../images/illustrations/drawkit-grape-pack-illustration-1.svg'

const About = () => {
  return (
      <Flex direction="column" _odd={{order: "2"}}>

        <Flex 
        w="100%"
        justifyContent={["center", "space-between", "space-between", "space-around"]}
        align="center" 
        bg="teal.200"
        pt={["sm", "md", "lg", "4rem"]}
        >
            <Box>
              <Image 
              src={`${Photographer}`} 
              alt="Segun Adebayo" 
              w={["sm", "md", "lg", "xl"]} 
              h={["9rem", "md", "lg", "xl"]}/>
            </Box>
            <Box overflow="hidden" pr="5px">
              <Container pr="5px">
                <Text fontSize={["sm", "md", "lg", "xl"]} pr="8px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quia id fugiat ut, eum sequi atque incidunt harum doloribus! Alias.</Text>
              </Container>
            </Box> 
        </Flex>

        <Flex 
        w="100%"
        justifyContent={["center", "space-between", "space-between", "space-around"]}
        align="center" 
        bg="teal.200"

        >
          <Box overflow="hidden" pr="5px">
            <Container pr="5px">
              <Text fontSize={["sm", "md", "lg", "xl"]} pr="8px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quia id fugiat ut, eum sequi atque incidunt harum doloribus! Alias.</Text>
            </Container>
          </Box>
          <Box>
            <Image 
              src={`${HoldingPhone}`} 
              alt="Segun Adebayo" 
              w={["sm", "md", "lg", "xl"]} 
              h={["9rem", "md", "lg", "xl"]}/>
          </Box>
        </Flex>

        <Flex 
        w="100%"
        justifyContent={["center", "space-between", "space-between", "space-around"]}
        align="center" 
        bg="teal.200"
        pt={["sm", "md", "lg", "4rem"]}
        >
            <Box>
              <Image 
              src={`${office}`} 
              alt="Segun Adebayo" 
              w={["sm", "md", "lg", "xl"]} 
              h={["9rem", "md", "lg", "xl"]}/>
            </Box>
            <Box overflow="hidden" pr="5px">
              <Container pr="5px">
                <Text fontSize={["sm", "md", "lg", "xl"]} pr="8px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quia id fugiat ut, eum sequi atque incidunt harum doloribus! Alias.</Text>
              </Container>
            </Box> 
        </Flex>
      </Flex>
   
  )
}

export default About


