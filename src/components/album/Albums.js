import {Flex, Heading, Spinner, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {Link as ReactLink} from 'react-router-dom'


import { useAuth } from '../../contexts/AuthContext'
import { useFire } from '../../contexts/FirebaseContext'
import useAlbums from '../../hooks/useAlbums'
import ImageGrid from '../pictureItems/ImageGrid'
import AlbumGrid from './AlbumGrid'

const Albums = () => {
  const { currentUser } = useAuth()
  const { albums } = useAlbums()
  const {firebaseFunctions, isLoading, images, albumCollection} = useFire()
  const [renderImages, setRenderImages] = useState(false)
  const [thumbNailImage, setThumbNailImage] = useState([])
  const [loadin, setLoadin] = useState(false)
  const [albumCurrent, setAlbumsCurrent] = useState()
  //get the albums of the current user and set the ablums in the context (see firebasecontext)



  //get the images for the current user to use as thumbnails for the albumcards

  /*generate random thumbnail images for the albumCard component from the images in the corresponding album owned by the current user */
  useEffect(() => {

    const getRandomThumbNailFromAlbum = async () => {
      setLoadin(true)
        let albumsRes = await firebaseFunctions.getUserAlbums(currentUser.uid)
        console.log("albums", albumsRes, albumCollection)
        setAlbumsCurrent(albumsRes)
        // let imageRes = await firebaseFunctions.getUserImages(currentUser.uid)
        // console.log("images by user ID", imageRes)
        // let imageRes2 = await firebaseFunctions.getImagesByAlbumId(albumsRes.id)
        // console.log("images by album ID", imageRes2)
        // let tempArr = imageRes2.map(pic => pic)
        // let random = tempArr[Math.floor(Math.random() * tempArr.length)];
        // console.log("THUMBNAIL", random)
        // setThumbNailImage(random)
      
      
      setLoadin(false)
    }

    getRandomThumbNailFromAlbum()
  }, [])

  /*check if the albums to be rendered owned by the current user (had a weird bug where albums would stick between renders) */
  useEffect(() => {
   let test = albumCollection.map(alb => {
      if(currentUser.uid !== alb.id){
        return true;
      }
     else return false;
    })
    setRenderImages(test)
  }, [])


	return (
		<>
			<Flex justify="center" align="center" w="100%" mt="5rem" direction="column">
        <Heading pt="1rem" >
          {albumCollection.length ? "Your Albums" : "Create new albums"}
        </Heading>
        <Link as={ReactLink} to="/console/albums/create" fontSize="5.2rem">+</Link>
      </Flex>

			{
				loadin && albumCollection.length && renderImages
					? (
          <Flex justify="center" align="center" mt="10rem" key={214124}>
            <Spinner   
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  />
          </Flex>)
					: albumCollection.length && (<AlbumGrid albums={albumCurrent} images={images} thumbNail={thumbNailImage} />)
			}

		</>
	)
}

export default Albums
