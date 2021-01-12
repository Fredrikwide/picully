import { SimpleGrid, Flex, Link, Box, Heading, Text, Button } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FirebaseContext, useFire } from '../../contexts/FirebaseContext'
import AlbumCard from '../Cards/AlbumCard'
import Album from './Album'
import {Link as ReactLink, Navigate, useNavigate} from 'react-router-dom'
import useAlbums from '../../hooks/useAlbums'



const Albums = ({albums}) => {
  const {currentUser} = useAuth()
  const [error, setError] = useState(false)
  const [who, setWho] = useState()
  const {firebaseFunctions} = useFire()
  const navigate=useNavigate()
  useEffect(() => {
    
    const getOwnerNameFromId = async () => {
      let ownerRes = await firebaseFunctions.getUser()
    }
  }, [])
  useEffect(() => {
    console.log(albums)
  }, [])
  return (
    <>
    <Flex justify="center" align="center" flex="1" >
      <SimpleGrid minChildWidth={["120px", "150px", "200px", "220px"]} spacing="22px" maxW="100vw">
        {albums.length ?
        albums.map((album) => {
          return album.user_albums.map((userAlbum, index) =>{
            return ( 
              <Flex justify="center" align="center" direction="column" key={index}>
                <AlbumCard  
                description={userAlbum.description}
                name={userAlbum.name} 
                owner={userAlbum.owner} 
                key={userAlbum.name}
                
                />
                <Flex justify="space-evenly" align="center" cursor="pointer"> 
                  <Link as={ReactLink} to={`/console/albums/${album.name}`} key={album.ownerId} textDecoration="none" >
                    <Box>
                      <Button >Go to album</Button>
                    </Box>
                  </Link>
                  <Button>delete</Button>
                </Flex>
              </Flex> 
          )
          })
       
        })
        : <h1>{error}</h1>
       }
   
      </SimpleGrid>
      <Box ml="4rem" border="2px" borderColor="teal.400" maxH="150px" onClick={() => navigate('/console/albums/create')}>
        <Text>ADD ALBUM</Text>
    </Box>
    </Flex>
   
    </>
  )
}

export default Albums
