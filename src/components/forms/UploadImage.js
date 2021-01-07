import { FormControl } from '@chakra-ui/react'
import React from 'react'

const UploadImage = () => {
  const handleSubmitImage = () => console.log('submitted')
  return (
    <form onSubmit={handleSubmitImage}>
      <FormControl>

      </FormControl>
    </form>
  )
}

export default UploadImage
