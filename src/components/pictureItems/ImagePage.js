import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const ImagePage = () => {

  const {imageName} = useParams()



  return (
    <Flex justify="center" align="center">
      <Flex direction="column">
        <Flex>
          <AspectRatio >
            <Image url="" alt=""/>
          </AspectRatio>
        </Flex>
        <Flex>
          <Box>
            <Heading>
              Title
            </Heading>
          </Box>
          <Box>
            <Text>
              description
            </Text>
            <Text>
              size
            </Text>
            <Text>
              owner
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ImagePage
