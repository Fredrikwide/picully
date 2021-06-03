
import { AddIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Image, Text, Button, CloseButton, Checkbox, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter, Spinner } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react';

import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';
import {v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom';


const SharedImageGrid = (props) => {
  const {id} = useParams();
  const { firebaseFunctions, db } = useFire()
  const { getImagesByAlbumId } = firebaseFunctions;
  const [loading, setLoading] = useState(false);
  const [allowCreateNewAlbum, setAllowCreateNewAlbum] = useState(null);
  const {
      imagesInCurrentAlbum,
      setPickedImages, 
      pickedImages, 
      discardedImages,
      isUploaded,
      albumToShare,
      setDiscardedImages,
    } = useUpdate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checkers, setCheckers] = useState([])
  const [uid, setUid] = useState('')
  const checkBoxPickedRef = useRef(null)
  const checkBoxDiscardRef = useRef(null)

  useEffect(() => {
    (async () => {
      if(id !== undefined && id !== null && id !== '') {
        setLoading(true)
        setCheckers([]);
        let ref = db.collection('albums');
        let res = await ref.doc(id).get();
        let docRef = await res.data();
        docRef.images.forEach((img, i)=> {
          let newImg = {
            ...img,
            docId: id,
            id: i,
            picked: false,
            discarded: false,
          }
          setCheckers(prevImgs => [...prevImgs, newImg])
        })
        setLoading(false);         
      }
      else {
        console.log('error')
        setCheckers([]);
        setLoading(true)  
        let ref = db.collection('albums').doc(id);
        let res = ref.get();
        let docRef = res.data();
        await docRef.images.forEach((img, i)=> {
            let newImg = {
              ...img,
              docId: id,
              id: i,
              picked: false,
              discarded: false,
            }
            setCheckers(prevImgs => [...prevImgs, newImg])
          })
          setLoading(false);
        }
    })()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploaded])
  const handlePickImage = async (e, item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.forEach(obj => {
        if(!obj.picked && obj.id === item.id) {
          obj.picked = true
          setPickedImages(prevItems => [...prevItems, obj])
        }
        else if(obj.picked && obj.id === item.id ) {
          obj.picked = false
          setPickedImages(pickedImages.filter(obj => !pickedImages.includes(obj)))
        }
      })
    }
    setCheckers(filterChecks)
  }

  const handleDiscardimage = async (e, item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.map(obj => {
        if(!obj.discarded && obj.id === item.id) {
          obj.discarded = true
          setDiscardedImages(prevItems => [...prevItems, item])
        }
        else if(obj.discarded && obj.id === item.id ) {
          obj.discarded = false
          setDiscardedImages(discardedImages.filter(obj => !discardedImages.includes(obj)))
        }
      })
    }
    setCheckers(filterChecks)
  }

  useEffect(() => {
    let totalLength = pickedImages.length + discardedImages.length;
    if(totalLength === checkers.length){
      setAllowCreateNewAlbum(true);
    }
    else {
      setAllowCreateNewAlbum(false);
    }
    
  }, [discardedImages, pickedImages, checkers])

  const handleNewAlbum = async () => {
    let ref = db.collection('albums').doc(id);
    let res = await ref.get();
    setUid(res.data().owner_id)
    onOpen()
  }

  return (
    <>
    {
      !loading ?
      <>
        <Flex key={uuidv4()} justify="center" w="400px" width="100vw" p="2rem">
        {
          allowCreateNewAlbum !== undefined && allowCreateNewAlbum !== null && allowCreateNewAlbum === true ? (
          <Button key={uuidv4()}  mr="2rem" colorScheme="teal" onClick={handleNewAlbum}>
              Add images to new album
          </Button>
          )
          : (
          <Button disabled="true">
            you must choose to pick or discard every image in the album
          </Button>
          )
        }
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
                  <CreateNewAlbumFromPickedImages docId={id} uid={uid} pictures={pickedImages}/>
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
         checkers.length > 0 && checkers.map((item, i) => (
            <>
              <GridItem 
                key={i}
                colSpan={1} 
                rowSpan={2} 
                overflow="hidden"
              >
              <Flex 
                justify="space-between" 
                align="center" 
                flexBasis="0" 
              >
              <Text
                isTruncated
                w="100%"
                fontSize="sm" 
                textAlign="center" 
                p="5px">{item.title}
              </Text>
              </Flex>
              <Box>
                <Image
                  src={item.url} 
                  alt={item.title} 
                  h="100%" 
                  w="100%" 
                  objectFit="contain"
                  p="5px" 
                />
              </Box>
              <Flex border="3px" justify="space-between" borderColor="red">
                <Checkbox
                  ref={checkBoxPickedRef}
                  isDisabled={checkers[i].discarded}
                  isChecked={checkers[i].picked}
                  ml="5px"
                  size="md"
                  id={item.id}
                  colorScheme="green"
                  onChange={(e) => handlePickImage(e, item)}
                >
                  keep
                </Checkbox>
                <Checkbox
                  ref={checkBoxDiscardRef}
                  isDisabled={checkers[i].picked}
                  isChecked={checkers[i].discarded}
                  ml="5px"
                  size="md"
                  id={item.id}
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
       :
       <>
         <Flex
           height="100vh"
           justify="center" 
           align="center"
         >
         <Spinner   
           thickness="6px"
           speed="0.65s"
           emptyColor="gray.200"
           color="teal.500"
           size="xl"  
           />
           Loading
         </Flex>
       </>
      }
    </>
  )
}

export default SharedImageGrid