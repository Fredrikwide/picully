import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ImageUploadPage = () => {
  const [imageToUpload, setImageToUpload] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const types = ["image/png", "image/jpg", "image.jpeg"]
  const handleSubmitImage = () => console.log('submitted')
  const handleFileUpload = (e) => {
    if(e.target.files.length && types.includes(e.target.files[0].type)){
      setImageToUpload(e.target.files[0])
    }
    else {
      setImageToUpload(null)
      setErrorMessage('som ting wong')
    }
  }
  useEffect(() => {
    console.log(imageToUpload)
  }, [imageToUpload])

  return (
    <Flex justify="center" align="center">
      <Box>
        <form>
        <FormControl>
          <FormLabel>Upload your image</FormLabel>
          <Input type="file" onChange={e => handleFileUpload(e)} />
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
        </form>
      </Box>
    </Flex>
  )
}

export default ImageUploadPage
