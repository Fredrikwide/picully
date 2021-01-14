
import { Box, Flex, Link, Heading } from '@chakra-ui/react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const Console = () => {

  return (
    <>
      <Flex justify="space-around" align="center" maxW="100vw" h="70vh">
          <Link as={ReactLink} to="/console/albums" >
            <Box w="300px" h="400px" p="10px" bg="teal.100" border="2px" borderColor="red">
              <Flex justify="center" align="center" w="100%" h="100%">
                <Heading>
                  Go to Albums
                </Heading>
              </Flex>
            </Box>
          </Link>
          <Link as={ReactLink} to="/console/albums" >
            <Box w="300px" h="400px" p="10px" bg="teal.100" border="2px" borderColor="red">
              <Flex justify="center" align="center" w="100%" h="100%">
                <Heading>
                  Create Albums
                </Heading>
              </Flex>
            </Box>
          </Link>
      </Flex>
    </>
 
  )
}

export default Console
