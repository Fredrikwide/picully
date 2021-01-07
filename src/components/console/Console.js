import { Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {imageUrls} from './imageData'



const Console = () => { 


  return (
    <Flex justify="center" align="center" mt="5rem">
      <Grid templateColumns="repeat(4, 1fr)" gap={2} w="80%"maxW="100vw" overflow="hidden" >
        {imageUrls.map((img, i) => {
          return (
         
              <Image src={img} key={i} alt="image" maxW="90%" overflow="hidden" objectFit="cover"  />

          )})}
      </Grid>
    </Flex>
  )
}

export default Console
