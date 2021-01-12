import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, InputGroup, InputRightElement, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFire } from '../../contexts/FirebaseContext'
import firebase from 'firebase'
import useUploadImage from '../../hooks/useUploadImage'

const types = ["image/png", "image/jpg", "image.jpeg"]
const UploadImage = ({albumId}) => {

  const [imageToUpload, setImageToUpload] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const {storage, db} = useFire()
  const { uploadProgress, error, isSuccess } = useUploadImage(imageToUpload, albumId);
  

  const handleFileUpload = (e) => {
    console.log("current file", e.target.files[0])
    setImageToUpload(e.target.files[0])
  }

  useEffect(() => {
    console.log('i changed', uploadProgress)
  }, [imageToUpload])
  //ChakraUi bugged with file input so had to use inline styles :(
  return (
      
        <form>
            <Flex justify="center" align="center">
              <InputGroup display="flex" justifyContent="center" alignItems="center" mt="10rem">
              <Input  pt="5px"type="file" onChange={handleFileUpload} w="400px" textAlign="center" />
              <InputRightAddon bg="teal.400" color="white" cursor="pointer" _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
              </InputRightAddon>
              </InputGroup>
            </Flex>
        </form>   

  )
}

export default UploadImage
