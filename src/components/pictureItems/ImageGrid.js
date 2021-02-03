
import { AddIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Heading, Image, Text, Button, CloseButton, Checkbox, Flex, AspectRatio, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, ModalFooter } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({albumId}) => {
  const {db, storage} = useFire()
  const [deleteImage, setDeleteImage] = useState(false);
  const { currentUser } = useAuth()
  const {isUploaded} = useUpdate()
  const {imagesInCurrentAlbum, imageDeleted, setImageDeleted,currentAlbum, setPickedImages, pickedImages, setAlbumToShare, setSharedUrl, sharedUrl} = useUpdate()
  const [isChecked, setIsChecked] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  
  const handleReviewLink = () => {
    let uniqNum = uuidv4()
    let url = `${currentAlbum.title}/${uniqNum}`;
    setSharedUrl(url)
  };


	const handleDeleteImage = async (img) => {
    console.log(img)
    // eslint-disable-next-line no-restricted-globals
    let ref = db.collection('images').where("albums", "array-contains", currentAlbum.id)
    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete()
      });
    });
    await ref.delete();
    await storage.ref(img.path).delete();
     setImageDeleted(true)
	}

  useEffect(() => {
    console.log("deleted")
  }, [imageDeleted])

  useEffect(() => {
    console.log("uploaded")
  }, [isUploaded, currentAlbum.id])


  const handlePickImage = async (e, item) => {
    console.log(e.target.checked, item)

      if(e.target.checked && e.target.id === item.id) {
        e.target.isChecked = true
        setPickedImages(prevItems => [...prevItems, item])
        console.log(pickedImages, "added")
    
      }
      else if(!e.target.checked && e.target.id === item.id){
        e.target.isChecked = false
        setPickedImages(pickedImages.filter(item => !pickedImages.includes(item)))
        console.log(pickedImages, "popped")
    
      }
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    console.log("picked", pickedImages)
  }, [pickedImages])


  const handleNewAlbum = async () => {
    onOpen()
  }

  const handleShareAlbum = () => {
    handleReviewLink()
    setAlbumToShare(currentAlbum)
    navigate(`/picully/${sharedUrl}`)
  }
  
  return (
    <>
      <Flex key={uuidv4()} justify="flex-end" align="center" width="100%" mt="2rem" mb="1rem">
        <Flex key={uuidv4()} justify="space-between" w="400px">
        <Text key={uuidv4()} >Add images to new album</Text>
        <Button key={uuidv4()}  mr="2rem" w="80px" h="30px" colorScheme="teal" onClick={handleNewAlbum}>
          <AddIcon key={uuidv4()} h={6} w={6} colorScheme="teal" />
        </Button>
          <>
            <Modal
              key={uuidv4()}
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
            <ModalOverlay/>
            <ModalContent key={uuidv4()} >
            <Flex key={uuidv4()} justifyContent="center" alignItems="center" direction="column">
              <ModalHeader>Create new album</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex justify="center" align="center">
                  <CreateNewAlbumFromPickedImages pictures={pickedImages}/>
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
      <Flex justify="center" align="center" w="400px">
        <Button mr="2rem" w="80px" h="30px" colorScheme="teal" onClick={handleShareAlbum}>
          share
        </Button>
      </Flex>
    </Flex>
    <Grid 
    key={uuidv4()}
    mr="1rem"
    ml="1rem" 
    templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} 
    templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(3, 1fr)",]} 
    mt="2rem" 
    gap={8}
    overflowX="hidden"
    h="100%"
    w="100%">
      {
        
        !imageDeleted && 
        imagesInCurrentAlbum !== undefined 
        && imagesInCurrentAlbum.length 
        && imagesInCurrentAlbum.map((image, index) => (
          <>
          <GridItem key={uuidv4()} colSpan={1} rowSpan={2} overflow="hidden">

            <Flex key={uuidv4()} justify="space-between" align="center" flexBasis="0" >
            <CloseButton key={uuidv4()} id={image.albums[albumId]}  size="sm" onClick={() => handleDeleteImage(image)} />
            <Text
            key={uuidv4()}
            isTruncated
            w="100%"
            fontSize="sm" 
            textAlign="center" 
            p="5px">{image.title}
            </Text>
            </Flex>
            <Box key={uuidv4()}>
              <Image
              key={uuidv4()}
              src={image.url} 
              alt={image.title} 
              h="100%" 
              w="100%" 
              objectFit="contain"
              p="5px" 
              />
            </Box>
            <Flex border="3px" borderColor="red" key={uuidv4()}>
              <Checkbox
                
                ml="5px"
                size="md"
                id={image.id}
                colorScheme="green"
                onChange={(e) => handlePickImage(e, image)}
                >
                pick
              </Checkbox>
            </Flex>
          </GridItem>
          </>
        ))
      }
    </Grid>
    </>
  )
}

export default ImageGrid