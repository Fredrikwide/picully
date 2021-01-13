import { SimpleGrid, Flex, Link, Box, Heading, Text, Button, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FirebaseContext, useFire } from '../../contexts/FirebaseContext'
import AlbumCard from '../Cards/AlbumCard'
import Album from './Album'
import {Link as ReactLink, Navigate, useNavigate, useParams} from 'react-router-dom'
import useAlbums from '../../hooks/useAlbums'



const Albums = ({albums}) => {
  const {currentUser} = useAuth()
  const {albumName} = useParams()
  const [currUserAlbums, setCurrUserAlbums] = useState([])
  const [error, setError] = useState(false)
  const [owner, setOwner] = useState()
  const [who, setWho] = useState()
  const {firebaseFunctions, db} = useFire()
  const navigate=useNavigate()


  return (
    <>
      <Flex justify="center" align="center" flex="1" >

        <SimpleGrid minChildWidth={["120px", "150px", "200px", "220px"]} spacing="22px" maxW="100vw">
          {albums.length &&
          albums.map((album, index) => {
              return ( 
                <Flex justify="center" align="center" direction="column" key={index}>
                  <Link as={ReactLink} to={`/console/albums/${album.title}`} key={album.ownerId} >
                      <AlbumCard
                      description={album.description}
                      title={album.title} 
                      id={album.id} 
                      key={album.name}
                      />
                    </Link>

                </Flex> 
            )
            })
        }
    
        </SimpleGrid>
       { albums.length ? (<Box ml="4rem" maxH="150px" cursor="pointer" onClick={() => navigate('/console/albums/create')}>
          <Button bg="teal.400" color="white" _hover={{backgroundColor: "teal.200" , color: "white"}} onClick={() => navigate('/console/albums/create')}>
            Add Album
          </Button>
        </Box> )
        : (
        <Flex justify="center" align="center" mr="14.5rem" mt="3rem">
          <Button bg="teal.400" color="white" _hover={{backgroundColor: "teal.200" , color: "white"}} onClick={() => navigate('/console/albums/create')}>
            Add Album
          </Button>
        </Flex>)
      }
      </Flex>

    </>
  )
}

export default Albums
