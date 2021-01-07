import { Flex, Heading, ListItem, Link, Spacer, UnorderedList, Box, useDisclosure, CloseButton } from '@chakra-ui/react'
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
const NavMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxRef = useRef()
  const handleClick = () => console.log("click")
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
                  <Link as={ReactLink} to="/" pr="5px">Home</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/">Home</Link>
                </ListItem>

                <ListItem mt="30px">
                  <Link as={ReactLink} to="/">Home</Link>
                </ListItem>

              </UnorderedList>
            </DrawerBody>

            <DrawerFooter>
              <CloseButton size="md" mr={1} onClick={onClose} />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
   </>
  )
}

export default NavMobile
