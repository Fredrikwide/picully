import { Button, Flex, Heading, ListItem,Link, Spacer, UnorderedList} from '@chakra-ui/react'
import {useContext, useEffect} from 'react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { UpdateContext } from '../../contexts/UpdateContext';

const NavBar = () => {
const {signedUpIsClicked,setSignUpIsClicked} = useContext(UpdateContext)
const {currentUser, logout} = useAuth();
const navigate = useNavigate()
const handleSignUpMenuClick = () => setSignUpIsClicked(!signedUpIsClicked)

const handleSignOut = async () => { 
   try { 
     await logout() 
     navigate("/") 
  } catch (err) {
    console.log(err)
  }
}
  return (
    <Flex
      color="teal.500"
      maxW="100vw" 
      minW="100vw"
      h="80px"
      overflow="hidden"
      justify="space-between"
    >
      <Flex justify="center" align="center">
        <Heading color="teal.300" ml="60px" p="5px" cursor="pointer" _hover={{color: "teal.200"}}>Picully</Heading>
      </Flex>

      <Flex 
          justify="center" 
          align="center"
          borderLeft="4px"
          borderColor="teal.500"

          >
        <UnorderedList
          display="flex" 
          justify="center" 
          align="stretch"
          direction="row" 
          styleType="none"
          fontSize={["1rem", "1rem", "1.1rem", "1.125rem"]}
          fontWeight="bold"
          role="navigation" 
          aria-label="Main"
          mr="60px"

          cursor="pointer"
         >
          <ListItem  
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                background: "teal.500",
                color: "white"
              }}  
            >
            <Link as={ReactLink} to="/">Home</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                background: "teal.500",
                color: "white"
              }}
          >
            <Link as={ReactLink} to="/">About</Link>
          </ListItem>
          {
          !currentUser ?
          <ListItem >
            <Button 
              onClick={handleSignUpMenuClick}
              color="white"
              background="teal.500"
              mt="8px"
            >
              Sign Up
            </Button>
          </ListItem>
          :
          <Button 
            onClick={handleSignOut}
            color="white"
            background="teal.500"
            mt="8px"
          >
            Sign out
          </Button>
          }
          <ListItem  
            p={["4px", "6px", "8px", "16px"]} 
            mr={["2px", "4px", "8px", "16px"]}
            _hover=
              {{
                background: "teal.500",
                color: "white"
              }}
            >
            <Link as={ReactLink} to="/">Contact</Link>
          </ListItem>
        </UnorderedList>
        </Flex>
    </Flex>
  )
}

export default NavBar
