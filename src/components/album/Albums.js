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
			<Flex justify="center" align="center" w="100%" mt="2rem" direction="column" mb="4rem">
        <Heading pt="1rem" pb="1rem"  >
          {currentUserAlbums.length > 0 ? "Your Albums" : "Create new albums"}
        </Heading>
        <>
          <Button 
          backgroundColor="teal.400" 
          color="white" 
          onClick={onOpen} 
          border="2px" 
          borderColor="teal.500" 
          boxShadow="0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)"
          _hover={{"backgroundColor": "teal.300", "borderColor": "teal.200", "textColor": "#eee"}}
          >
           new Album
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
				isLoading && currentUserAlbums.length > 0
					? (
          <Flex justify="center" align="center" mt="1rem" key={214124}>
            <Spinner   
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  />
          </Flex>)
					: currentUserAlbums.length > 0 && (<AlbumGrid albums={currentUserAlbums} images={images} />)
			}

		</>
	)
}

export default Albums
