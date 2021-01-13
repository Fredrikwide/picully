import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, InputGroup, InputRightElement, InputRightAddon, Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFire } from '../../contexts/FirebaseContext'
import firebase from 'firebase'
import useUploadImage from '../../hooks/useUploadImage'
import ImageCard from '../Cards/ImageCard'
import ImageGrid from '../pictureItems/ImageGrid'

const types = ["image/png", "image/jpg", "image.jpeg"]
const UploadImage = ({albumId, albumTitle, userId}) => {
  let reader = new FileReader();
  const [imageToUpload, setImageToUpload] = useState()
  const [upload, setUpload] = useState(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagesToUpload, setImagesToUpload] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const {firebaseFunctions, db} = useFire()
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [previewArr, setPreviewArr] = useState()
  const { uploadProgress, error, isSuccess } = useUploadImage(upload !== undefined &&upload, albumId, userId);
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log("current files", e.target.files)
    if(e.target.files.length > 1) {
      let temparr = Array.from(e.target.files)
      let multiple = temparr.map(file => file)
      setImagesToUpload(multiple)
    }
    else setImageToUpload(e.target.files[0])
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    setImageToUpload(imageToUpload)
    if(imageToUpload.length) {
      setUpload(imageToUpload)
    }
    
  }
  
  useEffect(() => {
   if(isSuccess) {
     setImageToUpload({})
     setUpload("")
     setMessage('Successfully uploaded the image')
   }
   else if(error) {
     console.log(error)
   }
  }, [isSuccess, error, uploadProgress, isSubmitting, upload])

  useEffect(() => {
    if (!imageToUpload && !imagesToUpload) {
        setPreview(undefined)
        return
    }
    else if (imagesToUpload.length) {
      let itemWithUrlArr = imagesToUpload.map(itm => itm.url = URL.createObjectURL(itm))
      setPreviewArr(itemWithUrlArr)
    }
    else if(imageToUpload) {
      const objectUrl = URL.createObjectURL(imageToUpload)
      let tmpObj = {url: objectUrl}
      setPreview(tmpObj)
      console.log(preview, "single")
    }


    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(preview)
}, [imageToUpload,imagesToUpload])
  //ChakraUi bugged with file input so had to use inline styles :(
  return (
    <>
     
      <Flex>
        { uploadProgress !== null && <Progress value={uploadProgress} />}
      </Flex>
      <form>
        <Flex justify="center" align="center">
          <InputGroup display="flex" justifyContent="center" alignItems="center" mt="10rem">
            <Input  pt="5px"type="file" multiple onChange={handleFileUpload} w="400px" textAlign="center" />
            <InputRightAddon bg="teal.400" color="white" cursor="pointer" onClick={onSubmit} _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
            </InputRightAddon>
          </InputGroup> 
        </Flex>
      </form>
      {
      preview !== undefined && preview 
      && 
      <ImageCard image={preview} />
      }
      {previewArr !== undefined && previewArr.length > 1 
      && <ImageGrid images={imagesToUpload} urls={previewArr} />
      }
    </>

  )
}

export default UploadImage
