import { SimpleGrid, Flex, Link, Box, Button, Grid, GridItem, Text, Image, Center } from '@chakra-ui/react'
import tempImage from '../../images/dog.jpg'

import AlbumCard from '../Cards/AlbumCard'

import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useFire } from '../../contexts/FirebaseContext'
import useAlbums from '../../hooks/useAlbums'
import { useAuth } from '../../contexts/AuthContext'




const Albums = () => {

  const navigate=useNavigate()
  const {currentUser}  = useAuth()
  const {albums, loading} = useAlbums(currentUser.uid)

  return (
    <>
    
    <Grid pr="10px" pl="10px" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(2, 1fr)",]} gap={3} h="600px">
      {
        albums !== undefined && albums.length && 
        albums.map((album, index) => (
          <Link as={ReactLink} to={`/console/albums/${album.title}`} key={index} textDecoration="none" _hover={{backgroundColor: "lightgrey"}}> 
            <GridItem p="2rem" colSpan={1} overflow="hidden" colStart={2} >
              <Flex justify="center" align="center" direction="column">
              <Text as="i" fontSize="sm" textAlign="center" p="5px" mt="1rem" textDecor="none">Title: {album.title}</Text>
              <Text as="i" fontSize="sm" textAlign="center" p="5px" mt="1rem" textDecor="none">description: {album.description}</Text>
              <Image src={tempImage} alt={album.title} h="400px" w="300px" objectFit="contain"/>
              </Flex>
            </GridItem>
          </Link>
        ))
      }
    </Grid>

    </>
  )
}

export default Albums
