import {Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


import { useAuth } from '../../contexts/AuthContext'
import { useFire } from '../../contexts/FirebaseContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumGrid from './AlbumGrid'

const Albums = () => {
  const { currentUser } = useAuth()
  const { albums } = useAlbums()
  const {firebaseFunctions, isLoading, images} = useFire()
  const [renderImages, setRenderImages] = useState(false)
  const [thumbNailImage, setThumbNailImage] = useState([])

  //get the albums of the current user and set the ablums in the context (see firebasecontext)
  useEffect(() => {
   const getOwnersById = async () => {
    await firebaseFunctions.getUserAlbums(currentUser.uid)
   }
   getOwnersById()
  }, [])


  //get the images for the current user to use as thumbnails for the albumcards

  /*generate random thumbnail images for the albumCard component from the images in the corresponding album owned by the current user */
  useEffect(() => {

    const getRandomThumbNailFromAlbum = async () => {
      await firebaseFunctions.getImagesByUserId(currentUser.uid)
      if(images.length)
        {
        await firebaseFunctions.getImagesByAlbumId(currentUser.uid)
        let tempArr = images.map(pic => pic)
        let random = tempArr[Math.floor(Math.random() * tempArr.length)];
        setThumbNailImage(random)
      }
      else;
    }

    getRandomThumbNailFromAlbum()
  }, [])

  /*check if the albums to be rendered owned by the current user (had a weird bug where albums would stick between renders) */
  useEffect(() => {
   let test = albums.map(alb => {
      if(currentUser.uid !== alb.id){
        return true;
      }
     else return false;
    })
    setRenderImages(test)
  }, [])


	return (
		<>
			<Flex justify="center" align="center" w="100%" mt="5rem">
        <Heading pt="1rem" pb="2rem">
          {albums.length ? "Your Albums" : "Create new albums"}
        </Heading>
      </Flex>

			{
				isLoading && albums.length && renderImages
					? (
          <Flex justify="center" align="center" mt="10rem" key={214124}>
            <Spinner   
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  />
          </Flex>)
					: (<AlbumGrid albums={albums} images={images} thumbNail={thumbNailImage} />)
			}

		</>
	)
}

export default Albums
