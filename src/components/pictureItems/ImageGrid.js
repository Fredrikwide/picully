import { AspectRatio, Box, Flex, Grid, GridItem, Image, SimpleGrid, Link, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {Link as ReactLink} from 'react-router-dom'
import ImageCard from '../Cards/ImageCard'
import Gallery from 'react-grid-gallery';
const ImageGrid = ({images, albumName, previewURLS}) => {

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
    <Flex justify="center" align="center" >

        <SimpleGrid minChildWidth={"120px"} spacing="22px">
          {images.length ?
          images.map((image, index) => {
              return ( 
                <Flex p="10px" justify="center" align="center" direction="column" key={index}>
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
          : previewURLS.length  &&  
            previewURLS.map((prevUrl, index) => {
            return ( 
             
                    <ImageCard
                      url={prevUrl}
                      title={prevUrl.title || prevUrl.name} 
                      size={prevUrl.size || "undefined"}
                      key={prevUrl || index || "undefined" }
                    />
      
          )
          })
        }
    
        </SimpleGrid>
    </Flex>
  )
}

export default ImageGrid
