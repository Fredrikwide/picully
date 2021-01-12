import { AspectRatio, Grid, GridItem, Image } from '@chakra-ui/react'
import React, { useState } from 'react'

const ImageGrid = () => {

  const [imageHeight, setImageHeight] = useState(null)
  const [imageWidth, setImageWidth] = useState(null)

  const handleImageLoad = (event) => {
    const imageHeight = event.target.clientHeight;
    const imageWidth = event.target.clientWidth;
    setImageHeight(imageHeight)
    setImageWidth(imageWidth)
  }


  return (
    <Grid
    h="200px"
    templateRows="repeat(2, 1fr)"
    templateColumns="repeat(5, 1fr)"
    gap={4}
  >
    <GridItem rowSpan={2} colSpan={1} bg="tomato" >
      <AspectRatio maxW="400px" ratio={4 / 3}>
        <Image src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" onLoad={handleImageLoad} />
      </AspectRatio>
    </GridItem>
    <GridItem colSpan={2} bg="papayawhip" />
    <GridItem colSpan={2} bg="papayawhip" />
    <GridItem colSpan={4} bg="tomato" />
  </Grid>
  )
}

export default ImageGrid
