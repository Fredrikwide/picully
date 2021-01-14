
import { Grid, GridItem, Heading, Image, Text, Button, CloseButton, Checkbox, Flex, AspectRatio, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFire } from '../../contexts/FirebaseContext';
import { useUpdate } from '../../contexts/UpdateContext';
import useDelete from '../../hooks/useDelete';


const 
ImageGrid = ({images}) => {
  const {db, storage} = useFire()
  const [deleteImage, setDeleteImage] = useState(false);
  const { currentUser } = useAuth()
  const {isUploaded} = useUpdate()
  const {imagesInCurrentAlbum, imageDeleted, setImageDeleted} = useUpdate()
  const [isChecked, setIsChecked] = useState(false)

	const handleDeleteImage = async (img) => {

    // eslint-disable-next-line no-restricted-globals
    let ref = db.collection('images').where("title", "==", img.title)
    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
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


  let pickedImages = []
  const handlePickImage = (item) => {
      let ref = db.collection("images").where("album", "==", item.album)
    setIsChecked(!isChecked)
  }

  return (
    <Grid 
    mr="1rem"
    ml="1rem" 
    templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} 
    templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(3, 1fr)",]} 
    mt="5rem" 
    gap={6} 
    h="600px">
      {
        !imageDeleted && imagesInCurrentAlbum !== undefined && imagesInCurrentAlbum.length && 
        imagesInCurrentAlbum.map((image, index) => (
          <>
          <GridItem colSpan={1} rowSpan={2} key={index} overflow="hidden">
            <Flex justify="space-between" align="center" >
            <CloseButton  size="sm" onClick={() => handleDeleteImage(image)} />

            
            <Text 
            fontSize="sm" 
            textAlign="center" 
            p="5px">{image.title}
            </Text>
            </Flex>
            <AspectRatio>
              <Image 
              src={image.url} 
              alt={image.title} 
              h="100%" 
              w="100%" 
              objectFit="contain" 
              />
            </AspectRatio>
            <Flex justify="flex-end" align="center">
              <Checkbox 
              size="md"
              id={image.owner}
              colorScheme="teal" 
              onChange={() => handlePickImage(image)}>
                pick
              </Checkbox>
            </Flex>
          </GridItem>
          </>
        ))
      }
    </Grid>
  )
}

export default ImageGrid