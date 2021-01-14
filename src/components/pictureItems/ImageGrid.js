import { Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

const 
ImageGrid = ({images}) => {
  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(3, 1fr)",]} mt="5rem" gap={3} h="600px" maxW="100vw">
      {
        images !== undefined && images.length && 
        images.map((image, index) => (
          <GridItem colSpan={1} key={index} overflow="hidden">
            <Text fontSize="sm" textAlign="center" p="5px">{image.title}</Text>
            <Image src={image.url} alt={image.title} h="100%" w="100%" objectFit="contain"/>
          </GridItem>
        ))
      }
    </Grid>
  )
}

export default ImageGrid