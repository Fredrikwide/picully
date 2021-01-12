import { AspectRatio, Box, Flex, Grid, GridItem, Image, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ImageGrid = ({images}) => {

  // const [imageHeight, setImageHeight] = useState(null)
  // const [imageWidth, setImageWidth] = useState(null)

  // const handleImageLoad = (event) => {
  //   const imageHeight = event.target.clientHeight;
  //   const imageWidth = event.target.clientWidth;
  //   setImageHeight(imageHeight)
  //   setImageWidth(imageWidth)
  // }

  useEffect(() => {
      console.log(images, "THIS IS IMAGES")
  }, [])

  return (
    <Flex justify="center" align="center" maxW="100vw" maxH="100vh" bg="teal.300">
      <SimpleGrid minChildWidth={["120px", "150px", "200px", "220px"]} spacing="22px" maxW="100vw">
      {
      images.length ? images.map((pic, index)=> 
        (
          <Image src={pic.url} alt={pic.title} width="200px" h="300px" key={index}/>
        )
        )
      
        : <h1>error</h1>
      }
      </SimpleGrid>
    </Flex>
  )
}

export default ImageGrid
