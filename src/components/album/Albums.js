import {Flex, Heading, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages'
import { useFire } from '../../contexts/FirebaseContext'
import { useUpdate } from '../../contexts/UpdateContext'
import AlbumGrid from './AlbumGrid'

const Albums = () => {

  const { isLoading, images, updatedAlbumTitle} = useFire();
  const {currentUserAlbums} = useUpdate();
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {

  }, [updatedAlbumTitle])

	return (
		<>
			<Flex justify="center" align="center" w="100%" mt="2rem" direction="column">
        <Heading pt="1rem" >
          {currentUserAlbums.length ? "Your Albums" : "Create new albums"}
        </Heading>
        <>
          <Button mr="2rem" w="80px" h="30px" colorscheme="teal" onClick={onOpen}>
           +
          </Button>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay  />
            <ModalContent >
            <Flex justifyContent="center" alignItems="center" direction="column">
              <ModalHeader>Create new album</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex justify="center" align="center">
                  <CreateNewAlbumFromPickedImages />
               </Flex>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Flex>
            </ModalContent>
          </Modal>
        </>
      </Flex>

			{
				isLoading && currentUserAlbums.length 
					? (
          <Flex justify="center" align="center" mt="1rem" key={214124}>
            <Spinner   
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  />
          </Flex>)
					: currentUserAlbums.length && (<AlbumGrid albums={currentUserAlbums} images={images} />)
			}

		</>
	)
}

export default Albums
