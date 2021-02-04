/* eslint-disable react-hooks/exhaustive-deps */
// Sample card from Airbnb
import { Box, Image } from '@chakra-ui/react'




const AlbumCard = ({id, title, description,thumbNail}) => {
console.log(thumbNail, "thumbnail")
  return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="none" mt="5rem">
        <Image 
          src={thumbNail ? thumbNail.url : "https://via.placeholder.com/300"}
          alt={thumbNail ? thumbNail.title: "empty"}/>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            title: {title}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            description: {description}
          </Box>
        
        </Box>
        
  )
}

export default AlbumCard

