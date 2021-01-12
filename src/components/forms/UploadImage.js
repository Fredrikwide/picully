import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, InputGroup, InputRightElement, InputRightAddon, Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFire } from '../../contexts/FirebaseContext'
import firebase from 'firebase'
import useUploadImage from '../../hooks/useUploadImage'

const types = ["image/png", "image/jpg", "image.jpeg"]
const UploadImage = ({albumId, albumTitle, userId}) => {

  const [imageToUpload, setImageToUpload] = useState()
  const [upload, setUpload] = useState()
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const {firebaseFunctions, db} = useFire()

  const { uploadProgress, error, isSuccess } = useUploadImage(upload, albumId, userId);
  
  const handleFileUpload = (e) => {
    console.log("current file", e.target.files[0])
    setUpload(e.target.files[0])
    e.target.value = '';
  }
  
  const onSubmit = (e) => {
    setImageToUpload(imageToUpload)
    
  }
  
  useEffect(() => {
    const getAlbumById = async () => {
      let res = await firebaseFunctions.getAlbumByTitle(albumTitle)
      // let Otherres = firebaseFunctions.getAlbumById(albumId)
      console.log(res, "get album by title")
      console.log(albumId, "Album ID")
    }
    getAlbumById()
   if(isSuccess) {
     setImageToUpload({})
     setUpload("")
     setMessage('Successfully uploaded the image')
   }
   else if(error) {
     console.log(error)
   }
  }, [isSuccess, error,uploadProgress])

  //ChakraUi bugged with file input so had to use inline styles :(
  return (
    <>
      <Flex>
        { uploadProgress !== null && <Progress value={uploadProgress} />}
      </Flex>
      <form>
        <Flex justify="center" align="center">
          <InputGroup display="flex" justifyContent="center" alignItems="center" mt="10rem">
            <Input  pt="5px"type="file" onChange={handleFileUpload} w="400px" textAlign="center" />
            <InputRightAddon bg="teal.400" color="white" cursor="pointer" onClick={onSubmit} _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </form>
    </>

  )
}

export default UploadImage
