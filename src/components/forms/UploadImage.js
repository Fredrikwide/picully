import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const UploadImage = () => {
  const [imageToUpload, setImageToUpload] = useState()
  const handleSubmitImage = () => console.log('submitted')
  return (
  <Flex justify="center" align="center">
      <form onSubmit={handleSubmitImage}>
        <FormControl>
          <FormLabel>Upload your image</FormLabel>
          <Input type="file" />
        </FormControl>
      </form>
    </Flex>
  )
}

export default UploadImage
