import { Flex, Heading, ListItem, Link, Spacer, UnorderedList, Box, useDisclosure, CloseButton, Button } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import {Link as ReactLink} from 'react-router-dom'
import React, { useRef } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useAuth } from '../../contexts/AuthContext'
const NavMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxRef = useRef()
  const {logout} = useAuth()
  const handleSignOut = () => logout()
  return (
    <>
    <Flex justify="flex-end" align="center" minW="100vw">
      <Box ref={boxRef} mt={["1rem", "md", "lg", "xl"]} mr={["2rem", "md", "lg", "xl"]} onClick={onOpen}>
        {!isOpen && <HamburgerIcon w={[10, 12, 16]} h={[10, 12, 16]} />}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={boxRef}
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
                ml="100px" 
                mt="120px" 
                fontSize="1.3rem"
              >
                <ListItem>
                  <Link as={ReactLink} to="/">Home</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/" pr="5px">About</Link>
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
              >
                Sign out
              </Button>          
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
   </>
  )
}

export default NavMobile
