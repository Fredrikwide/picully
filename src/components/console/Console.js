import { Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {imageUrls, tallImages} from './imageData'



const Console = () => { 


  return (
    <Flex justify="center" align="center" mt="5rem">
      <Grid templateColumns="repeat(5, 1fr)"gap={2} w="80%"maxW="100vw" overflow="hidden" >
        {imageUrls.map((img, i) => {
          return (
              <Image src={img} key={i} alt="image" maxW="90%" overflow="hidden" objectFit="cover"  />
          )})}
          {
            tallImages.map((tall, ind) => {
              return ( <GridItem colSpan={1} rowSpan={2}><Image src={tall} key={ind} alt="tall-image"  maxW="90%" overflow="hidden"  objectFit="cover" /></GridItem>)
            })
          }
      </Grid>
    </Flex>
  )
}

export default Console
