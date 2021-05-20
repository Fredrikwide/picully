
import { AddIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Image, Text, Button, CloseButton, Checkbox, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter, Spinner,   Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal, 
  Heading,
  Link} from '@chakra-ui/react'
import { useEffect, useState, useRef, useCallback, } from 'react';
import firebase from 'firebase/app';
import {firestore as FS} from 'firebase/firestore';
import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({albumId}) => {
  const {db, storage, firebaseFunctions} = useFire()
  
  const { updateAlbumSharedUrl } = firebaseFunctions;
  const {isUploaded} = useUpdate()
  const {
      imagesInCurrentAlbum,
      imageDeleted, 
      setImageDeleted,
      currentAlbum, 
      setPickedImages, 
      pickedImages,
      setCurrentAlbum,
      albumToShare, 
      setAlbumToShare, 
      setSharedUrl, 
      sharedUrl,
      setIsLoading,
      isLoading,
      setImagesInCurrentAlbum,
      discardedImages, 
      setRenderShared,
      setDiscardedImages,
      setSharedImages} = useUpdate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checkers, setCheckers] = useState([])
  const [images, setImages] = useState(imagesInCurrentAlbum)
  const navigate = useNavigate()
  const checkBoxPickedRef = useRef(null)
  const checkBoxDiscardRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(albumId !== undefined ? albumId : undefined );

	const handleDeleteImage = async (image) => {
    setLoading(true);
    console.log(image, 'DELETE THIS')
    let albumsRef = db.collection('albums').doc(image.docId);
    let res = await albumsRef.get()
    let imageRefs = await res.data().images
    console.log(imageRefs, 'UNFILTER')
    let newImageArr = imageRefs.filter(img => img.key !== image.key);
    await albumsRef.update({
      images: newImageArr
    })
    setImages(newImageArr)
    console.log(newImageArr, 'FILTERED')
    setLoading(false);
  }
  useEffect(() => {
    (async () => {
      if(albumId !== undefined && albumId !== null && albumId !== '') {
        setLoading(true)
        setImages([]);
        let ref = db.collection('albums');
        let res = await ref.doc(albumId).get();
        let docRef = await res.data();
        setCurrentAlbum(docRef)
        docRef.images.forEach((img, i)=> {
          let newImg = {
            ...img,
            docId: img.id,
            id: i,
            picked: false,
            discarded: false,
          }
          console.log(newImg, 'NEW')
          setImages(prevImgs => [...prevImgs, newImg])
        })
        setLoading(false);         
      }
      else {
        console.log('error')
        setImages([]);
        let url = window.location.href;
        let slug = url.match(/\/([^\/]+)\/?$/)[1];
        setLoading(true)  
        let ref = db.collection('albums');
        let res = await ref.where('slug', '==', slug).get();
        for(const doc of res.docs){
          let docRef = doc.data();
          setCurrentAlbum(docRef)
          setId(docRef.id)
          await docRef.images.forEach((img, i)=> {
            let newImg = {
              ...img,
              docId: img,id,
              id: i,
              picked: false,
              discarded: false,
            }
            setImages(prevImgs => [...prevImgs, newImg])
          })
          setLoading(false);
        }
      }
    })()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploaded])

  useEffect(() => {
    console.log(images, 'images in album')
  }, [images])


  const handlePickImage = async (item) => {
    let filterChecks = images.map(check => check)
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
    setImages(filterChecks)
  }

  useEffect(() => {
    console.log(pickedImages, 'PICKED')
  }, [pickedImages])


  
  const handleDiscardimage = async (item) => {
    let filterChecks = images.map(check => check)
    console.log(filterChecks, 'CHEKS')
    if(filterChecks.includes(item)){
      filterChecks = filterChecks.map(obj => {
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
    setImages(filterChecks)
  }


  const handleNewAlbum = async () => {
    onOpen()
  }

  const handleShareAlbum = async (album) => {

    let url = `${window.location.origin}/review/${album.id}`;
    console.log(url, "URL");
    updateAlbumSharedUrl(album.id, url);
    setAlbumToShare(album.id);
    setRenderShared(true);
  }
  
  return (
    <>
    {
      !loading ?
      <>
      <Flex justify="flex-end" align="center" width="100%" mt="2rem" mb="1rem">
        <Flex minW="100%">
          <Flex justify="center" align="center" w="100%">
            <Box w="33.3%">
              <Button w="100%"  colorScheme="teal" onClick={handleNewAlbum}>
                new album
              </Button>
            </Box>
            <Box w="13.37%"></Box>
            <Box  w="33.3%" >
            <Popover>
                <PopoverTrigger>
                  <Button 
                    colorScheme="blue" 
                    w="100%" 
                    onClick={() => handleShareAlbum(currentAlbum)}
                  >
                    share
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Share this URL with your friends</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Box w="100%">
                        <Link
                        color="blue.400" 
                        href={`${window.location.origin}/review/${currentAlbum.id}`}
                        >
                        {`${window.location.origin}/review/${currentAlbum.id}`}
                        </Link>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Box>
          </Flex>
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
   
      </Flex>
    </Flex>
    <Grid 
      key={uuidv4()}
      pr="10px" 
      pl="20px" 
      pb="10px"
      templateColumns={["repeat(1, minmax(0, 1fr)", "repeat(2, minmax(0, 1fr))","repeat(3, minmax(0, 1fr))","repeat(5, minmax(0, 1fr))",]} 
      templateRows={["repeat(1, minmax(0, 1fr))", "repeat(1, minmax(0, 1fr))","repeat(3, minmax(0, 1fr))","repeat(5, minmax(0, 1fr))",]} 
      gap={3}
      placeItems="center"
    >
      {
        images !== undefined 
        && images.length > 0 && !loading
        && images.map((item, i) => (
          <>
           {item !== undefined &&
            <GridItem
              key={i}
              colSpan={1} 
              rowSpan={1} 
              overflow="hidden"
            >
            <Flex 
              key={i}
              justify="space-between" 
              align="center" 
              flexBasis="0" 
            >
            { currentAlbum !== albumToShare &&
            <CloseButton
              key={i}
              id={item.id}  
              size="sm" 
              onClick={(e) => handleDeleteImage(item)} 
            /> 
            }
            <Text

              isTruncated
              w="100%"
              fontSize="sm" 
              textAlign="center" 
              p="5px">{item.title}
            </Text>
            </Flex>
           
              <Image
                src={item.url } 
                alt={item.title} 
                maxH="100%"
                maxW="100%"
                objectFit="contain"
                p="5px" 
              />
        
            <Flex border="3px" justify="space-between" borderColor="red">
              <Checkbox
                ref={checkBoxPickedRef}
                isDisabled={images[i].discarded}
                isChecked={images[i].picked}
                ml="5px"
                size="md"
                id={item.id}
                colorScheme="green"
                onChange={() => handlePickImage(item)}
              >
                pick
              </Checkbox>
              <Checkbox
                ref={checkBoxDiscardRef}
                isDisabled={images[i].picked}
                isChecked={images[i].discarded}
                ml="5px"
                size="md"
                id={item.id}
                colorScheme="red"
                onChange={() => handleDiscardimage(item)}
              >
                Discard
              </Checkbox> 
            </Flex>
          </GridItem>
          }
          </>
        ))
      }
    </Grid>
    </>
    : loading &&
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

export default ImageGrid