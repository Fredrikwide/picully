import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

const ImageCard = ({title, url, size}) => {
  return (
    <>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mt="5rem">
      <Image src={url} alt={title} />
      <Flex justify="center" align="center" direction="column">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Image Name: {title}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            size: {size}
          </Box>
      </Flex>
    </Box>
  </>
)
}

export default ImageCard
