
import { AddIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Image, Text, Button, CloseButton, Checkbox, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react';

import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({albumId}) => {
  const {db, storage} = useFire()
 
  const {isUploaded} = useUpdate()
  const {imagesInCurrentAlbum, imageDeleted, setImageDeleted,currentAlbum, setPickedImages, pickedImages, albumToShare , setAlbumToShare, setSharedUrl, sharedUrl, discardedImages, setDiscardedImages,setSharedImages} = useUpdate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checkers, setCheckers] = useState([])

  const navigate = useNavigate()
  const checkBoxPickedRef = useRef(null)
  const checkBoxDiscardRef = useRef(null)







  const handleReviewLink = () => {
    let uniqNum = uuidv4()
    let url = `/picully/${uniqNum}`;
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
    imagesInCurrentAlbum.map((img, i) => {
      let imageItem = {
        id: i,
        image: img,
        picked: false,
        discarded: false,
      }
      setCheckers(prevChecks => [...prevChecks, imageItem])
    })
  }, [])

  useEffect(() => {
  }, [imageDeleted])

  useEffect(() => {
  }, [isUploaded, currentAlbum.id])


  const handlePickImage = async (e, item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.forEach(obj => {
        if(!obj.picked && obj.id === item.id) {
          obj.picked = true
          setPickedImages(prevItems => [...prevItems, obj.image])
          console.log(pickedImages, "added")
        }
        else if(obj.picked && obj.id === item.id ) {
          obj.picked = false
          setPickedImages(pickedImages.filter(obj => !pickedImages.includes(obj)))
          console.log(pickedImages, "popped")
        }
      })
    }
    setCheckers(filterChecks)
  }


  
  const handleDiscardimage = async (e, item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.forEach(obj => {
        if(!obj.discarded && obj.id === item.id) {
          obj.discarded = true
          setDiscardedImages(prevItems => [...prevItems, item])
          console.log(pickedImages, "added")
        }
        else if(obj.discarded && obj.id === item.id ) {
          obj.discarded = false
          setDiscardedImages(discardedImages.filter(obj => !discardedImages.includes(obj)))
          console.log(discardedImages, "popped")
        }
      })
    }
    setCheckers(filterChecks)
  }


  const handleNewAlbum = async () => {
    onOpen()
  }

  const handleShareAlbum = (album) => {
    handleReviewLink()
    setAlbumToShare(album)
    if(pickedImages.length){
      setSharedImages(pickedImages)
    }
    navigate(`${sharedUrl}`)
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
          <Button mr="1rem" w="80px" h="30px" colorScheme="teal" onClick={() => handleShareAlbum(currentAlbum)}>
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
      w="100%"
    >
      {
        !imageDeleted && 
        imagesInCurrentAlbum !== undefined 
        && imagesInCurrentAlbum.length 
        && checkers.map((item, i) => (
          <>
            <GridItem 
              key={uuidv4()}
              colSpan={1} 
              rowSpan={2} 
              overflow="hidden"
            >
            <Flex 
              key={uuidv4()} 
              justify="space-between" 
              align="center" 
              flexBasis="0" 
            >
            { currentAlbum !== albumToShare &&
            <CloseButton 
              key={uuidv4()} 
              id={item.image.albums[albumId]}  
              size="sm" 
              onClick={() => handleDeleteImage(item.image)} 
            /> 
            }
            <Text
              key={uuidv4()}
              isTruncated
              w="100%"
              fontSize="sm" 
              textAlign="center" 
              p="5px">{item.image.title}
            </Text>
            </Flex>
            <Box key={uuidv4()}>
              <Image
                key={uuidv4()}
                src={item.image.url} 
                alt={item.image.title} 
                h="100%" 
                w="100%" 
                objectFit="contain"
                p="5px" 
              />
            </Box>
            <Flex border="3px" justify="space-between" borderColor="red" key={uuidv4()}>
              <Checkbox
                ref={checkBoxPickedRef}
                isDisabled={checkers[i].discarded}
                isChecked={checkers[i].picked}
                ml="5px"
                size="md"
                id={item.image.id}
                colorScheme="green"
                onChange={(e) => handlePickImage(e, item)}
              >
                pick
              </Checkbox>
              <Checkbox
                ref={checkBoxDiscardRef}
                isDisabled={checkers[i].picked}
                isChecked={checkers[i].discarded}
                ml="5px"
                size="md"
                id={item.image.id}
                colorScheme="red"
                onChange={(e) => handleDiscardimage(e, item)}
              >
                Discard
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