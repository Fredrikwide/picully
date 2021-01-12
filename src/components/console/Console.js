
import { Box, Flex, Link, Heading } from '@chakra-ui/react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const Console = () => {

  return (
    <>
      <Flex justify="center" align="center" maxW="100vw" >
          <Link as={ReactLink} to="/console/albums" >
            <Box w="200px" h="300px" p="10px" bg="teal.100" border="2px" borderColor="red">
              <Flex justify="center" align="center">
                <Heading>
                  Go to Albums
                </Heading>
              </Flex>
            </Box>
          </Link>
          <Link as={ReactLink} to="/console/albums/create" >
            <Box w="200px" h="300px" p="10px" bg="teal.100" border="2px" borderColor="red">
              <Flex justify="center" align="center">
                <Heading>
                  create Albums
                </Heading>
              </Flex>
            </Box>
          </Link>
      </Flex>
    </>
 
  )
}

export default Console
