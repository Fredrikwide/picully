
import { Grid, GridItem, Heading, Image, Text, Button, CloseButton, Checkbox, Flex, AspectRatio, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, ModalFooter } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import useDelete from '../../hooks/useDelete';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';


const ImageGrid = ({albumId}) => {
  const {db, storage} = useFire()
  const [deleteImage, setDeleteImage] = useState(false);
  const { currentUser } = useAuth()
  const {isPicked, setIsPicked} = useUpdate()
  const [picCullyUrl, setPicCullyUrl] = useState("")
  const {isUploaded} = useUpdate()
  const {imagesInCurrentAlbum, imageDeleted, setImageDeleted, setPickedImages, pickedImages} = useUpdate()
  const [isChecked, setIsChecked] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()


  
  const handleReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/cull/${album}`;
    setPicCullyUrl(url);
  };


	const handleDeleteImage = async (img) => {
    console.log(img)
    // eslint-disable-next-line no-restricted-globals
    let ref = db.collection('images').where("url", "==", img.url)
    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete()
      });
    });
    // await ref.delete();
    // await storage.ref(img.path).delete();
     setImageDeleted(true)
	}

  useEffect(() => {
    console.log("deleted")
  }, [imageDeleted])

  useEffect(() => {
    console.log("uploaded")
  }, [isUploaded])

  let pickedItems = []
  let unPickedItems = []
  const handlePickImage = (e,item) => {
    console.log(e.target.checked)
 

    let ref = db.collection("images").where("albums", "array-contains", item.albums)
      if(e.target.checked && e.target.id === item.title) {
        pickedItems.push(ref)
        setPickedImages(previtems => [...previtems, ...pickedItems])
        console.log(pickedItems)
      }
      else if(!e.target.checked && e.target.id === item.title){
        unPickedItems.push(ref)
        pickedItems.filter(item => !unPickedItems.includes(item))
        setPickedImages(pickedItems)
        console.log(pickedItems)
    
      }
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    console.log("picked", pickedImages)
  }, [pickedImages])


  const handleNewAlbum = () => {
    onOpen()
  }

  const handleShareAlbum = () => {

  }
  
  return (
    <>
    <Flex justify="flex-end" align="center" width="100%" mt="2rem" mb="1rem">
    <Flex justify="space-between" w="400px">
        <Text>Add checked items to new album &gt;&gt;&gt;</Text>
        <Button mr="2rem" w="80px" h="30px" colorScheme="teal" onClick={handleNewAlbum}>
          Create +
        </Button>
        <>
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
      <Flex justify="space-between" w="400px">
        <Text>share</Text>
        <Button mr="2rem" w="80px" h="30px" colorScheme="teal" onClick={handleNewAlbum}>
          Create +
        </Button>
      </Flex>
    </Flex>
    <Grid 
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
          <GridItem colSpan={1} rowSpan={2} key={index} overflow="hidden">

            <Flex justify="space-between" align="center" flexBasis="0" >
            <CloseButton id={image.albums[albumId]}  size="sm" onClick={() => handleDeleteImage(image)} />
            <Text
            isTruncated
            w="100%"
            fontSize="sm" 
            textAlign="center" 
            p="5px">{image.title}
            </Text>
            </Flex>
            <Box>
              <Image 
              src={image.url} 
              alt={image.title} 
              h="100%" 
              w="100%" 
              objectFit="contain"
              p="5px" 
              />
            </Box>
            <Flex border="3px" borderColor="red">
              <Checkbox
              ml="5px"
              size="md"
              id={image.title}
              colorScheme="green"
              onChange={(e) => handlePickImage(e,image)}>
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