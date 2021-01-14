import { Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

const 
PreviewImageGrid = ({images, previewURLS}) => {
  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(5, 1fr)",]} templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)","repeat(2, 1fr)",]} gap={3} h="600px">
    {
      previewURLS !== undefined && previewURLS.length && 
      previewURLS.map((prevItem, index) => (
      
          <GridItem p="2rem" colSpan={1} overflow="hidden" colStart={2} key={index}>
            <Image src={prevItem.url} alt={prevItem.title} h="400px" w="300px" objectFit="contain"/>     
          </GridItem>
      ))
    }
  </Grid>
  )
}

export default PreviewImageGrid
