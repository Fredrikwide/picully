import { Button, Flex, Heading, ListItem,Link, Spacer, UnorderedList, Avatar, Wrap, WrapItem} from '@chakra-ui/react'
import {useEffect} from 'react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const NavBarSignedIn = () => {

 const {currentUser, logout} = useAuth();
 const navigate = useNavigate()

useEffect(() => {

}, [currentUser])

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
      maxW="1200px" 
      minW="100vw"
      h="80px"

      justify="space-between"
    >
      <Flex justify="center" align="center">
        <Heading ml="60px" p="5px">Picully</Heading>
      </Flex>
      <Spacer />
      <Flex justify="center" align="center">
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
         >
          <ListItem  
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                background: "teal.500",
                color: "white"
              }}  
            >
            <Link as={ReactLink} to="/">Console</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                border: "2px solid teal.500",
                color: "white"
              }}
          >
            <Link as={ReactLink} to="/">Albums</Link>
          </ListItem>
          {
          !currentUser ?
          <ListItem  
          m={["4px", "6px", "8px", "16px"]}
          _hover=
              {{
                border: "2px solid teal.500",
                color: "white"
              }}
          >            
            <Link as={ReactLink} to={"/"}>Profile</Link> 
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
          <Wrap>
            <WrapItem>
              <Avatar 
                name="Segun Adebayo" 
                src="https://bit.ly/sage-adebayo"
               />
              </WrapItem>
          </Wrap>
        </UnorderedList>
        </Flex>
    </Flex>
  )
}

export default NavBarSignedIn
