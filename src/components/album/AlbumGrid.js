import {Flex, Link, Box, Grid, GridItem, Text, Image } from '@chakra-ui/react'
import tempImage from '../../images/dog.jpg'
import {Link as ReactLink} from 'react-router-dom'
import { useUpdate } from '../../contexts/UpdateContext'
import { useEffect } from 'react'

const AlbumGrid = () => {
  const {currentUserAlbums, setCurrentAlbum} = useUpdate()

  const setAlbumClicked = (album) => {

    setCurrentAlbum(album);
  }

  return (
    <>
      {
        (currentUserAlbums !== undefined && currentUserAlbums.length > 0 ) &&
      
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
              </Flex>
              <Box height="100%" pt="20px">
                <Image
                  src={album.images.length > 0 ? album.images[0].url : tempImage} 
                  alt={album.title}
                  />
              </Box>
              </Flex>
            </GridItem>        
          </Link>
        )) 
         }
      </Grid>
      }
    </>
  )
}

export default AlbumGrid
