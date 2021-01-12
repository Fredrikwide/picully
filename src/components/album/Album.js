import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'
import { useAuth } from '../../contexts/AuthContext'
import { AspectRatio, Box, Flex, Image, Spinner } from '@chakra-ui/react'
import useAlbum from '../../hooks/useAlbum'
import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'

const Album = () => {
  const  {albumName} = useParams()
  const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [albumArr, setAlbumArr] = useState({})
  const [albumId, setAlbumId] = useState()
  const {firebaseFunctions} = useFire()

  useEffect(() => {
    const getImagesFromFire = async () => {
      setIsLoading(true)
      let albumRes = await firebaseFunctions.getAlbumByTitle(albumName)
      console.log(albumRes)
      // albumRes.map(alb => {
      //   let tempArr = []
      //   tempArr.push(alb)
      //   setAlbumArr([...tempArr])
      // })
      
      let res = await firebaseFunctions.getImages()
      setPictures(res)
      setIsLoading(false)
    }
    getImagesFromFire()
  }, [])

  const { album, images, loading } = useAlbum(albumId)

	return (
		<>
      <Flex justify="center" align="center" direction="column">
        <h2>This is album {albumName}</h2>
        {
        loading ? 
        <Spinner   thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"  
        />
        : 
        (pictures.length ? <ImageGrid images={pictures} /> : <h1>error</h1>)
			}
      <UploadImage albumId={albumId !== undefined && albumId} albumTitle={albumName} userId={currentUser.uid}/> 
      </Flex>
		</>
	)
}

export default Album

