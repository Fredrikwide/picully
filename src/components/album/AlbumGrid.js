import {Flex, Link, Box, Grid, GridItem, Text, Image, CloseButton } from '@chakra-ui/react'
import tempImage from '../../images/dog.jpg'
import {Link as ReactLink} from 'react-router-dom'
import { useUpdate } from '../../contexts/UpdateContext'
import { useFire } from '../../contexts/FirebaseContext'
import { useEffect, useState } from 'react'

const AlbumGrid = () => {
  const {currentUserAlbums, setCurrentAlbum, albumDeleted, setAlbumDeleted} = useUpdate()
  const {db, storage} = useFire();
  const [loading, setLoading] = useState(false);


  const setAlbumClicked = (album) => {
    setCurrentAlbum(album);
  }


  const handleDeleteAlbum = async (album) => {
    setAlbumDeleted(false);
    let albumsRef = db.collection('albums').doc(album.docId);
    let resp = await albumsRef.get()
    let storageRefs = []
    let imagesrefs = await resp.data().images;
    console.log(imagesrefs)
    imagesrefs.forEach(async img => {
      let ref = storage.ref().child(img.path)
      storageRefs.push(ref);
    })
    storageRefs.forEach(async ref => {
      console.log(ref, 'ref')
      await ref.delete()}
    )
    console.log('DELETED')
    await albumsRef.update({
      images: []
    })
    await albumsRef.delete()
    setAlbumDeleted(true)
    setLoading(false);
  }

  useEffect(() => {
 
  }, [albumDeleted])

  return (
    <>
      {
        (currentUserAlbums !== undefined && currentUserAlbums.length > 0 && !loading) ?
      
      <Grid
        pr="10px" 
        pl="20px" 
        pb="10px"
        templateColumns={["repeat(1, minmax(0, 1fr)", "repeat(2, minmax(0, 1fr))","repeat(3, minmax(0, 1fr))","repeat(5, minmax(0, 1fr))",]} 
        templateRows={["repeat(1, minmax(0, 1fr))", "repeat(1, minmax(0, 1fr))","repeat(1, minmax(0, 1fr))","repeat(1, minmax(0, 1fr))",]} 
        gap={3}
        placeItems="center"
      >
      {

      currentUserAlbums.map((album, index) => (
        <Flex key={index} direction="column" position="relative">
          <CloseButton
          position="absolute"
          top="10px"
          right="10px"
          key={index}
          id={album.docId}  
          size="sm" 
          onClick={(e) => handleDeleteAlbum(album)} 
          /> 
          <Link
          as={ReactLink} 
          to={`/home/albums/${album.slug}`} 
          key={index}
          onClick={() => setAlbumClicked(album)}
          textDecoration="none" 
          _hover={{backgroundColor: "lightgrey"}
          
          }
          > 
            <GridItem
              p="1rem"
              as={Flex}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minW="100%"
              minH="100%"
              boxShadow="0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)"
              overflow="hidden" 
            >
            <Flex direction="column" w="100%">

            <Flex direction="column">
                <Text
                isTruncated
                as="i"
                fontSize="sm"
                p="5px"
                textDecor="none"
                >
                  Title: {album.title}
                </Text>
                <Text
                  isTruncated
                  as="i" 
                  fontSize="sm" 
                  p="5px" 
                  textDecor="none"
                >
                  Description: {album.description}
                </Text>
                <Text
                  isTruncated
                  as="i" 
                  fontSize="sm" 
                  p="5px" 
                  textDecor="none"
                >
                  pictures: {album.images.length && album.images.length }
                </Text>
              </Flex>
              <Box height="100%" pt="20px">
                <Image
                  src={album.images.length > 0 && album.images[0] ? album.images[0].url : tempImage} 
                  alt={album.title}
                  />
              </Box>
              </Flex>
            </GridItem>        
          </Link>
          </Flex>
        )) 
         }
      </Grid>
      : <h1>loading</h1>
      }
    </>
  )
}

export default AlbumGrid
