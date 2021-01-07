import { Box, Flex, Heading, ListItem, Spacer, UnorderedList, useColorMode, useMediaQuery } from '@chakra-ui/react'

import {Link} from 'react-router-dom'

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)")
  return (
    <Flex 
      maxW="1200px" 
      minW="100vw" 
      h="80px" 
      bg='tomato' 
      justify="space-between"
    >
      <Flex justify="center" align="center">
        <Heading ml="16px" p="5px">Picully</Heading>
      </Flex>
      <Spacer />
      <Flex justify="center" align="center">
        <UnorderedList 
          display="flex" 
          justify="center" 
          align="stretch"
          direction="row" 
          styleType="none"
          fontSize="1.125rem"
          fontWeight="bold"
          role="navigation" 
          aria-label="Main"
         

         >
          <ListItem  
            p="10px"
            _hover=
              {{
                background: "white",
                color: "teal.500",
                height: "100%"
              }}  
            >
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem
            p="10px"
            _hover=
              {{
                background: "white",
                color: "teal.500",
                height: "100%",
                borderRadius: "10px"
              }}
          >
            <Link to="/">About</Link>
          </ListItem>
          <ListItem p="10px">
            <Link to="/sign-up">Sign up</Link>
          </ListItem>
          <ListItem p="10px" mr="16px">
            <Link to="/">Contact</Link>
          </ListItem>
        </UnorderedList>
        </Flex>
    </Flex>
  )
}

export default NavBar
