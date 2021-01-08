import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AlbumCard from '../Cards/AlbumCard'
import {imageUrls, tallImages} from './imageData'



const Console = () => { 
  const handleUpVote = (e, id) => {
    setLikes(prevLikes => prevLikes += 1)
  }
  const handleDownVote = (e, id) => {
    if(!likes <= 0){
      setLikes(prevLikes => prevLikes - 1)
    }
    
  }
  const [likes, setLikes] = useState(0) 
  return (
    <Box p="2rem" mt="10rem"> 
      <SimpleGrid minChildWidth={["120px", "150px", "200px", "220px"]} spacing="20px" maxW="100vw">
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
     
      </SimpleGrid>
    </Box>
  )
}

export default Console
