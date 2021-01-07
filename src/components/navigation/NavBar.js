import { Button, Flex, Heading, ListItem, Spacer, UnorderedList} from '@chakra-ui/react'
import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {

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
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                border: "2px solid teal.500",
                color: "white"
              }}
          >
            <Link to="/">About</Link>
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
            <Link to={"/sign-in"}>Sign in</Link> 
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
            <Link to="/">Contact</Link>
          </ListItem>
        </UnorderedList>
        </Flex>
    </Flex>
  )
}

export default NavBar
