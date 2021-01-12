// Sample card from Airbnb
import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AlbumCard = (props ) => {
  const { albumName } = useParams()

  useEffect(() => {
  console.log(props)
  }, [])

  return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mt="5rem">
        <Image src="https://bit.ly/naruto-sage" alt="naruto-sage" />
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Album Name: {props.name}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            description: {props.description}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            owner_id: {props.owner }
          </Box>
        </Box>
   
  )
}

export default AlbumCard

