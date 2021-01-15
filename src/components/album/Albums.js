import {Flex, Heading, Spinner, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {Link as ReactLink} from 'react-router-dom'


import { useAuth } from '../../contexts/AuthContext'
import { useFire } from '../../contexts/FirebaseContext'
import { useUpdate } from '../../contexts/UpdateContext'
import useAlbums from '../../hooks/useAlbums'
import ImageGrid from '../pictureItems/ImageGrid'
import AlbumGrid from './AlbumGrid'

const Albums = () => {

  const { isLoading, images} = useFire()
  const {currentUserAlbums} = useUpdate()

	return (
		<>
			<Flex justify="center" align="center" w="100%" mt="2rem" direction="column">
        <Heading pt="1rem" >
          {currentUserAlbums.length ? "Your Albums" : "Create new albums"}
        </Heading>
        <Link as={ReactLink} to="/console/albums/create" fontSize="5.2rem">+</Link>
      </Flex>

			{
				isLoading && currentUserAlbums.length 
					? (
          <Flex justify="center" align="center" mt="1rem" key={214124}>
            <Spinner   
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  />
          </Flex>)
					: currentUserAlbums.length && (<AlbumGrid albums={currentUserAlbums} images={images} />)
			}

		</>
	)
}

export default Albums
