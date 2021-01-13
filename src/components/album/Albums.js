import { Box, Flex, Heading, Link, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { useFire } from '../../contexts/FirebaseContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumGrid from './AlbumGrid'

const Albums = () => {
  const { currentUser } = useAuth()
  const { albums, loading } = useAlbums()
  const [currUserAlbums, setCurrUserAlbums] = useState([])
  const [error, setError] = useState(false)
  const [owner, setOwner] = useState()
  const {firebaseFunctions} = useFire()

  

  useEffect(() => {
   const getOwnersById = async () => {
    await firebaseFunctions.getUserAlbums(currentUser.uid)
   }
   getOwnersById()
  }, [])

	return (
		<>
			<Flex justify="center" align="center" w="100%" mt="5rem">
        <Heading>
          {albums.length ? "Your Albums" : "Create new albums"}
        </Heading>
      </Flex>

			{
				loading && albums.length 
					? (
          <Flex justify="center" align="center" mt="10rem" key={214124}>
            <Spinner   thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"  />
          </Flex>)
					: (<AlbumGrid albums={albums} />)
			}

		</>
	)
}

export default Albums
