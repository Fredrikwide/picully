import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const WelcomeBanner = () => {
  return (
    <Flex 
      justify="space-around" 
      align="center"
      minH={["sm", "md", "lg", "xl"]}
      maxH={[""]}
      ml={["2rem", "2rem", "5rem", "12rem"]}
      mb={["0rem", "0rem", "1rem", "12rem"]}
      >
        <Box maxW={["100vw", "100vw", "100vw", "70wv"]}>
          <Heading 
            as="h1" 
            size={["sm", "md", "lg", "xl"]}
            overflow="hidden"
            p="16px"
            bgGradient="linear(to-l, teal.500,teal.200)"
            bgClip="text"
            fontSize={["3rem", "6rem", "3lg", "8xl"]}
            lineHeight={["3rem","6rem","6rem","6rem"]}
            fontWeight="extrabold"
          >
            Welcome to Picully
          </Heading>
          <Box 
            pt={["1rem", "md", "lg", "16px"]} 
            ml={["3rem", "md", "lg", "4rem"]}
          >
            <Text as="i" color="teal.500" fontSize={["sm", "md", "2rem", "3xl"]}>
            &#8212;&nbsp;&nbsp;&quot;Your photos&#44; their choice&quot;
            </Text>
          </Box>
        </Box>
      </Flex> 
  )
}

export default WelcomeBanner
