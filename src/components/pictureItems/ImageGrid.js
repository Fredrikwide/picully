
import { Grid, GridItem, Heading, Image, Text, Button, CloseButton } from '@chakra-ui/react'
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
  const {imagesOwnedByCurrentUser, imageDeleted, setImageDeleted} = useUpdate()


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

  return (
    <Grid 
    mr="1rem"
    ml="1rem" 
    templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} 
    templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(3, 1fr)",]} 
    mt="5rem" 
    gap={3} 
    h="600px"

    maxW="100vw">
      {
        !imageDeleted && imagesOwnedByCurrentUser !== undefined && imagesOwnedByCurrentUser.length && 
        imagesOwnedByCurrentUser.map((image, index) => (
          <GridItem colSpan={1} key={index} overflow="hidden">
            <CloseButton size="sm" onClick={() => handleDeleteImage(image)} />
            <Text fontSize="sm" textAlign="center" p="5px">{image.title}</Text>
            <Image src={image.url} alt={image.title} h="100%" w="100%" objectFit="contain"/>
          </GridItem>
        ))
      }
    </Grid>
  )
}

export default ImageGrid