import {Flex, Link, Grid, GridItem, Text, Image } from '@chakra-ui/react'
import tempImage from '../../images/dog.jpg'
import {Link as ReactLink} from 'react-router-dom'
import { useUpdate } from '../../contexts/UpdateContext'
import { useEffect } from 'react'

const AlbumGrid = () => {
  const {currentUserAlbums, setCurrentAlbum} = useUpdate()

  const setAlbumClicked = (album) => {
    console.log("CLICK", currentUserAlbums);
    console.log('CURRENT', album);
    setCurrentAlbum(album);
  }

  return (
    <>
      {
        (currentUserAlbums !== undefined && currentUserAlbums.length > 0 ) &&
      
      <Grid 
        pr="10px" 
        pl="10px" 
        pb="10px" 
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} 
        templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(2, 1fr)",]} 
        gap={3} h="600px" 
      >
      {

        currentUserAlbums.map((album, index) => (
          <Link 
          as={ReactLink} 
          to={`/home/albums/${album.slug}`} 
          key={index}
          onClick={() => setAlbumClicked(album)}
          textDecoration="none" 
          _hover={{backgroundColor: "lightgrey"}}
          > 
            <GridItem 
            p="2rem" 
            colSpan={1} 
            overflow="hidden" >
              <Flex 
              justify="center" 
              align="center" 
              direction="column"
              >
              <Text
              isTruncated
              as="i" 
              fontSize="sm" 
              textAlign="center" 
              p="5px" mt="1rem" 
              textDecor="none"
              >
                name: {album.title}
              </Text>
              <Text
               isTruncated
              as="i" 
              fontSize="sm" 
              textAlign="center" 
              p="5px" 
              mt="1rem" 
              textDecor="none"
              >
                description: {album.description}
              </Text>
              <Image 
                src={tempImage} 
                alt={album.name} 
                h="400px" 
                w="300px" 
                objectFit="contain"
                />
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
