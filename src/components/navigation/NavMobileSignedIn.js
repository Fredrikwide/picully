import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, CloseButton, DrawerBody, Link, DrawerContent, DrawerHeader, DrawerOverlay, Flex, ListItem, UnorderedList, DrawerFooter, Drawer, useDisclosure, Button, Center } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const NavMobileSignedIn = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxRef = useRef()
  const {logout} = useAuth()
  const handleSignOut = () => logout()

  return (
    <>
    <Flex justify="flex-end" align="center" minW="100vw">
      <Box ref={boxRef} mt="10px" mr="24px" onClick={onOpen}>
        {!isOpen && <HamburgerIcon w={10} h={10} />}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={boxRef}
        size={["full", "md", "lg", "0"]}

      >
        <DrawerOverlay>
          <DrawerContent>
            <Flex justify="space-around" align="center" mt="20px">
              <DrawerHeader textAlign="center">Menu</DrawerHeader>
              <Box>
                <CloseButton onClick={onClose}/>
              </Box>
            </Flex>
            <DrawerBody background="green">
              <UnorderedList 
                display="flex" 
                styleType="none" 
                p="10px" 
                justify="space-around" 
                align="center" 
                flexDirection="column" 
                ml="87px" 
                mt="50px" 
                fontSize="1.3rem"
              >
                <ListItem>
                  <Link as={ReactLink} to="/">Console</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/" pr="5px">Albums</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/">Profile</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/">Upload</Link>
                </ListItem>

              </UnorderedList>
            </DrawerBody>

            <DrawerFooter 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
            >
                <Button
                mt={4}
                mb={8}
                background="teal.500"
                color="white"
                onClick={handleSignOut}
                
                >Sign out</Button>          
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
   </>
  )
}

export default NavMobileSignedIn
