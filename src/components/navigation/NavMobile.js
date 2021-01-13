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
import { ArrowForwardIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useAuth } from '../../contexts/AuthContext'
const NavMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxRef = useRef()
  const {currentUser, logout} = useAuth()
  const handleSignOut = () => logout()
  return (
    <>

      <Flex justify="space-between" align="center" minW="100vw">
        <Heading 
        color="teal.300" 
        ml={["1.4rem", "2rem", "2.3rem", "xl"]}
        mt={["1rem", "2rem", "2.3rem", "xl"]}
        >Picully</Heading>
        <Box ref={boxRef} mt={["1.2rem", "md", "lg", "xl"]} mr={["2rem", "md", "lg", "xl"]} onClick={onOpen}>
          {!isOpen && <HamburgerIcon w={[10, 12, 16]} h={[10, 12, 16]} />}
        </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={boxRef}
        background="green"
      >
        <DrawerOverlay>
          <DrawerContent>
            <Flex justify="space-around" align="center" mt="20px">
              <DrawerHeader textAlign="center">Menu</DrawerHeader>
              <Box>
                <CloseButton onClick={onClose}/>
              </Box>
            </Flex>
            <DrawerBody display="flex" justifyContent="center"  alignItems="center">
              <UnorderedList 
                display="flex" 
                styleType="none" 
                justify="center" 
                align="center" 
                flexDirection="column" 
                fontSize="1.3rem"
              >
                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  borderBottom="2px" 
                  borderColor="teal.200"
                  width="200px"
                 
                >
                  <Box>
                    <Link as={ReactLink} to="/">Home</Link>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </ListItem>

                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  borderBottom="2px" 
                  borderColor="teal.200"
                  width="200px"
                  pt="16"
                >
                  <Box>
                    <Link as={ReactLink} to="/">About</Link>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </ListItem>

                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  borderBottom="2px" 
                  borderColor="teal.200"
                  width="200px"
                  pt="16"
                >
                  <Box>
                    <Link as={ReactLink} to="/">Contact</Link>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </ListItem>

                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  borderBottom="2px" 
                  borderColor="teal.200"
                  width="200px"
                  pt="16"
                  mb="10"
                >
                  <Box>
                    <Link as={ReactLink} to="/">Home</Link>
                  </Box>
                  <Box>
                    <ArrowForwardIcon />
                  </Box>
                </ListItem>

              </UnorderedList>
            </DrawerBody>

            <DrawerFooter 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
              mb={["3rem", "18px", "20px", "22px"]}
            >
              {
                currentUser 
                ? 
                <Button
                  mt={2}
                  mb={8}
                  background="teal.200"
                  color="white"
                  size="md"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
                :
                ""
              }     
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
   </>
  )
}

export default NavMobile
