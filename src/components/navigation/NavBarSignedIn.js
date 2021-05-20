/* eslint-disable no-unused-vars */
import { Button, Flex, Heading, ListItem,Link, Spacer, UnorderedList, Avatar, Wrap, WrapItem, Tag, TagLabel, Box, Spinner} from '@chakra-ui/react'
import {useCallback, useContext, useEffect, useState} from 'react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';

const NavBarSignedIn = () => {

  const {firebaseFunctions} = useContext(FirebaseContext)
  const {currentUser, logout} = useAuth();
  const [user, setUser] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [err, setError] = useState(false)
  const navigate = useNavigate()
  
//get user info on mount
useEffect(() => {
  const getUserInfoOnMount = async () => {
    if(currentUser !== null){
      let res = await firebaseFunctions.getUser(currentUser.uid)
      if(res) {
        setUser(res)
      }
    }
    else {
      setError('')
    }
  }
  getUserInfoOnMount()
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])



const handleGoHome = () => navigate('/home/albums')

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
          cursor="pointer"
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
            >
            <Link as={ReactLink} to="/explore">Explore</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
          >
            <Link as={ReactLink} to="home/albums">Albums</Link>
          </ListItem>
          <ListItem
            p={["4px", "6px", "8px", "16px"]}
          >
            <Link as={ReactLink} to="/home">Home</Link>
          </ListItem>

          <ListItem

          m={["4px", "6px", "8px", "16px"]}
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
          <Box>
              <Tag 
                size="lg" 
                colorscheme="teal" 
                borderRadius="full" 
                ml="3rem"
                mt="2px" 
                p="5px"
              >
                <Avatar
                  size="md"
                  name={user.firstName}
                  ml={1}
                  mr={2}
                 
                />
                <TagLabel pt="10px" pb="10px" pr="12px" pl="5px">{user ? `${user.firstName} ${user.lastName}` : 'loading...'}</TagLabel>
              </Tag>
            </Box>
        </UnorderedList>
        </Flex>
    </Flex>
            
  )
}

export default NavBarSignedIn
