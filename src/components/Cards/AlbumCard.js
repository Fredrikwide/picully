/* eslint-disable react-hooks/exhaustive-deps */
// Sample card from Airbnb
import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Flex, Image, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-scroll'
import {useFire} from '../../contexts/FirebaseContext'


const AlbumCard = ({id, title, description,thumbNail}) => {
console.log(thumbNail, "thumbnail")
  return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mt="5rem">
        <Image 
          src={thumbNail ? thumbNail.url : "https://via.placeholder.com/300"}
          alt={thumbNail ? thumbNail.title: "empty"}/>

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

