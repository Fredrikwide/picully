
import { AddIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Image, Text, Button, Checkbox, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react';
import { useUpdate } from '../../contexts/UpdateContext';
import CreateNewAlbumFromPickedImages from '../forms/CreateNewAlbumFromPickedImages';
import {v4 as uuidv4} from 'uuid'


const ImageGrid = ({images}) => {

  const { userSelectedImagesToKeep, setuserSelectedImagesToKeep,
    userSelectedImagesToDelete, setuserSelectedImagesToDelete} = useUpdate()

  const [checkers, setCheckers] = useState([])

  const checkBoxPickedRef = useRef(null)
  const checkBoxDiscardRef = useRef(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    images.forEach((img, i) => {
      let imageItem = {
        id: i,
        image: img,
        picked: false,
        discarded: false,
      }
      setCheckers(prevChecks => [...prevChecks, imageItem])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handlePickImage = async (e, item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.forEach(obj => {
        if(!obj.picked && obj.id === item.id) {
          obj.picked = true
          setuserSelectedImagesToKeep(prevItems => [...prevItems, obj.image])

        }
        else if(obj.picked && obj.id === item.id ) {
          obj.picked = false
          setuserSelectedImagesToKeep(userSelectedImagesToKeep.filter(obj => !userSelectedImagesToKeep.includes(obj)))

        }
      })
    }
    setCheckers(filterChecks)
  }


  
  const handleDiscardimage = async (item) => {
    let filterChecks = checkers.map(check => check)
    if(filterChecks.includes(item)){
      filterChecks.forEach(obj => {
        if(!obj.discarded && obj.id === item.id) {
          obj.discarded = true
          setuserSelectedImagesToDelete(prevItems => [...prevItems, item])
        }
        else if(obj.discarded && obj.id === item.id ) {
          obj.discarded = false
          setuserSelectedImagesToDelete(userSelectedImagesToDelete.filter(obj => !userSelectedImagesToDelete.includes(obj)))

        }
      })
    }
    setCheckers(filterChecks)
  }
  
  const handleNewAlbum = async () => {
    onOpen()
  }

  return (
    <>
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

          images !== undefined 
        && images.length 
        && checkers.map((item, i) => (
          <>
            <Button key={uuidv4()}  mr="2rem" w="80px" h="30px" colorscheme="teal" onClick={handleNewAlbum}>
              <AddIcon key={uuidv4()} h={6} w={6} colorscheme="teal" />
            </Button>
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
                  <CreateNewAlbumFromPickedImages pictures={userSelectedImagesToKeep}/>
               </Flex>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Flex>
            </ModalContent>
          </Modal>
        
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
                colorscheme="green"
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
                colorscheme="red"
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