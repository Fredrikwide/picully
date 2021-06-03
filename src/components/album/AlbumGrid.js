import {Flex, Link, Box, Grid, GridItem, Text, Image, CloseButton, Spinner } from '@chakra-ui/react'
import tempImage from '../../images/dog.jpg'
import {Link as ReactLink} from 'react-router-dom'
import { useUpdate } from '../../contexts/UpdateContext'
import { useFire } from '../../contexts/FirebaseContext'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
const AlbumGrid = () => {
  const {currentUserAlbums, setCurrentAlbum, albumDeleted, setAlbumDeleted} = useUpdate()
  const {db, storage} = useFire();
  const [loading, setLoading] = useState(false);


  const setAlbumClicked = (album) => {
    setCurrentAlbum(album);
  }


  const handleDeleteAlbum = async (album) => {
    setLoading(true)
    setAlbumDeleted(false);
    let albumsRef = db.collection('albums').doc(album.docId);
    let resp = await albumsRef.get()
    let storageRefs = []
    let imagesrefs = await resp.data().images;

    imagesrefs.forEach(async img => {
      let ref = storage.ref().child(img.path)
      storageRefs.push(ref);
    })
    storageRefs.forEach(async ref => {
      await ref.delete()}
    )
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
        <Flex key={uuidv4()} direction="column" position="relative">
          <CloseButton
          position="absolute"
          top="10px"
          right="10px"
          key={uuidv4()}
          id={album.docId}  
          size="sm" 
          onClick={(e) => handleDeleteAlbum(album)} 
          /> 
          <Link
          as={ReactLink} 
          to={`/home/albums/${album.slug}`} 
          key={uuidv4()}
          onClick={() => setAlbumClicked(album)}
          textDecoration="none" 
          _hover={{backgroundColor: "lightgrey"}
          
          }
          > 
            <GridItem
              key={uuidv4()}
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
            <Flex direction="column" w="100%" key={uuidv4()}>

            <Flex direction="column" key={uuidv4()}>
                <Text
                key={uuidv4()}
                isTruncated
                as="i"
                fontSize="sm"
                p="5px"
                textDecor="none"
                >
                  Title: {album.title}
                </Text>
                <Text
                  key={uuidv4()}
                  isTruncated
                  as="i" 
                  fontSize="sm" 
                  p="5px" 
                  textDecor="none"
                >
                  Description: {album.description}
                </Text>
                <Text
                  key={uuidv4()}
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
                  src={album.images.length > 0 && album.images[0] && album.images !== undefined ? album.images[0].url : tempImage !== undefined && tempImage  } 
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
      :  
      <>
        <Flex
          direction="column"
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
        <Text>Loading</Text>
        </Flex>
      </>
      }
    </>
  )
}

export default AlbumGrid
