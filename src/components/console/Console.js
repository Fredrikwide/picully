import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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

      <Grid templateColumns="repeat(4, 1fr)"gap={4} maxW="100vw" overflow="hidden" >
        {imageUrls.map((img, i) => {
          return (
            <GridItem rowSpan={2} maxW="100vw" border="2px" borderColor="teal.500">
              <Box>
                <Image src={img} key={i} alt="image" objectFit="cover" h="80%"/>
              </Box>
              <Flex p="10px" justifyContent="space-evenly" h="50px">
                <Text>likes: {likes}</Text>
                <ArrowUpIcon h={8} w={8} onClick={(e, ind)=> handleUpVote(e, ind)}/>
                <ArrowDownIcon h={8} w={8} onClick={(e, ind)=> handleDownVote(e, ind)}/>              
              </Flex>
            </GridItem>
          )})}
          {
            tallImages.map((tall, ind) => {
              return ( 
              <GridItem  maxW="100vw" border="2px" borderColor="teal.500" colSpan={2}>

                <Box>
                <Image src={tall} key={ind} alt="tall-image"  objectFit="cover" likes={likes} />
                </Box>
                <Flex p="10px" justifyContent="space-evenly" h="50px">
                    <Text>likes: {likes}</Text>
                    <ArrowUpIcon h={8} w={8} onClick={(e, ind)=> handleUpVote(e, ind)}/>
                    <ArrowDownIcon h={8} w={8} onClick={(e, ind)=> handleDownVote(e, ind)}/>              
                </Flex>
               
              </GridItem>)
            })
          }
      </Grid>
  
  )
}

export default Console
