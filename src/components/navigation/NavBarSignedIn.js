import { Button, Flex, Heading, ListItem,Link, Spacer, UnorderedList, Avatar, Wrap, WrapItem, Tag, TagLabel} from '@chakra-ui/react'
import {useEffect} from 'react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const NavBarSignedIn = () => {

 const {currentUser, logout} = useAuth();
 const navigate = useNavigate()
  const handleGoHome = () => navigate('/console')
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
      <Flex justify="center" align="center" cursor="pointer">
        <Heading ml="60px" p="5px" onClick={handleGoHome}>Picully</Heading>
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
            <Link as={ReactLink} to="/upload">Upload</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                border: "2px solid teal.500",
                color: "white"
              }}
          >
            <Link as={ReactLink} to="/albums">Albums</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
            _hover=
              {{
                border: "2px solid teal.500",
                color: "white"
              }}
          >
            <Link as={ReactLink} to="/console">Console</Link>
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

              <Tag 
                size="lg" 
                colorScheme="teal" 
                borderRadius="full" 
                ml="3rem"
                mt="2px" 
                P="5px"
              >
                <Avatar
                  src="https://bit.ly/sage-adebayo"
                  size="md"
                  name="Segun Adebayo"
                  ml={-1}
                  mr={2}
                />
                <TagLabel p="15px">Segun</TagLabel>
              </Tag>
        </UnorderedList>
        </Flex>
    </Flex>
  )
}

export default NavBarSignedIn
