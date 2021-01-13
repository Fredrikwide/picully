import { AspectRatio, Box, Flex, Grid, GridItem, Image, SimpleGrid, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {Link as ReactLink} from 'react-router-dom'
import ImageCard from '../Cards/ImageCard'

const ImageGrid = ({images, albumName, urls}) => {

  // const [imageHeight, setImageHeight] = useState(null)
  // const [imageWidth, setImageWidth] = useState(null)

  // const handleImageLoad = (event) => {
  //   const imageHeight = event.target.clientHeight;
  //   const imageWidth = event.target.clientWidth;
  //   setImageHeight(imageHeight)
  //   setImageWidth(imageWidth)
  // }

  useEffect(() => {

  }, [])

  return (
    <Flex justify="center" align="center" flex="1" >

        <SimpleGrid minChildWidth={["120px", "150px", "200px", "220px"]} spacing="22px" maxW="100vw">
          {images.length ?
          images.map((image, index) => {
              return ( 
                <Flex justify="center" align="center" direction="column" key={index}>
                  <Link as={ReactLink} to={`/console/albums/${albumName}/${image.title ||image.name}`} key={image.id} >
                      <ImageCard
                        url={image.url}
                        title={image.title || image.name} 
                        size={image.size}
                        key={image.url}
                      />
                    </Link>
                </Flex> 
            )
            })
          : urls.length && urls.map((prevUrl, index) => {
            return ( 
              <Flex justify="center" align="center" direction="column" key={index}>
           
                    <ImageCard
                      url={prevUrl}
                      title={prevUrl.title || prevUrl.name} 
                      size={prevUrl.size || "undefined"}
                      key={prevUrl || "undefined"}
                    />
              </Flex> 
          )
          })
        }
    
        </SimpleGrid>
    </Flex>
  )
}

export default ImageGrid
