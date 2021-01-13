/* eslint-disable react-hooks/exhaustive-deps */
// Sample card from Airbnb
import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Flex, Image, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-scroll'
import {useFire} from '../../contexts/FirebaseContext'


const AlbumCard = ({id, title, description}) => {

  const {firebaseFunctions, images} = useFire()
  const [thumbNailImage, setThumbNailImage] = useState([])

  useEffect(() => {
    const getRandomThumbNailFromAlbum = async () => {
      await firebaseFunctions.getImagesByAlbumId(id)
      let tempArr = images.map(pic => pic)
      let random = tempArr[Math.floor(Math.random() * tempArr.length)];
      setThumbNailImage(random)
    }

    getRandomThumbNailFromAlbum()
  }, [])



  return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mt="5rem">
        <Image 
          src={thumbNailImage ? thumbNailImage.url : "https://via.placeholder.com/300"}
          alt={thumbNailImage ? thumbNailImage.title: "empty"}/>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            title: {title}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            description: {description}
          </Box>
        
        </Box>
        
  )
}

export default AlbumCard

