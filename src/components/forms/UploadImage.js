import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, InputGroup, InputRightElement, InputRightAddon, Progress, Heading, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFire } from '../../contexts/FirebaseContext'
import firebase from 'firebase'
import useUploadImage from '../../hooks/useUploadImage'
import ImageCard from '../Cards/ImageCard'
import ImageGrid from '../pictureItems/ImageGrid'
import PreviewImageGrid from '../pictureItems/PreviewImageGrid'
import { useAuth } from '../../contexts/AuthContext'
import { ref } from 'yup'
import { useUpdate } from '../../contexts/UpdateContext'


const UploadImage = ({albumId}) => {
  
  const [imageToUpload, setImageToUpload] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagesToUpload, setImagesToUpload] = useState([])
	const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
	const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth()
  const { db, storage, timestamp } = useFire()
  const {setIsUploaded} = useUpdate()
  const [preview, setPreview] = useState()

  const [previewArr, setPreviewArr] = useState()

  const types = ["image/png", "image/jpg", "image.jpeg"]

  const onUpload = (e, id) => {
    e.preventDefault()
   
    let image = e.target.files[0]
    console.log(image, id)
		if (!image) {
			setUploadProgress(null);
      setUploadedImage(null);
      setIsUploaded(false)
			setError(null);
			setIsSuccess(false);

			return;
    }
    setIsUploaded(false)
		setError(null);
		setIsSuccess(false);
    const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);
		const uploadTask = fileRef.put(image);

		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

		uploadTask.then(async snapshot => {

			const url = await snapshot.ref.getDownloadURL();
			// add uploaded file to db
			const img = {
        title: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
        type: image.type,
        // createdAt: timestamp(),
				url,
			};
						
			if (id) {    
        img.albums = []
        img.albums.push( db.collection('albums').doc(id))
      //  await db.collection("albums").doc(albumId).get().then(snapshot => {
      //     snapshot.forEach(doc => {
      //       console.log("DOCS", doc.data())
      //     })
      //   })
       
			}
			// add image to collection
			await db.collection('images').add(img)

			// let user know we're done
			setIsSuccess(true);
			setUploadProgress(null);

			// file has been added to db, refresh list of files
			setUploadedImage(img);
			setIsSuccess(true);
		}).catch(error => {
			console.error("File upload triggered an error!", error);
			setError({
				type: "warning",
				msg: `Image could not be uploaded due to an error (${error.code})`
			});
    });
	}

  
  useEffect(() => {
    console.log("i")
   if(isSuccess) {
     setImageToUpload({})
     setIsUploaded(true)
   }
   else if(error) {
     console.log(error)
   }
  }, [isSuccess, error, uploadProgress, isSubmitting])

//TODO fix the previews


//   useEffect(() => {
//     if (!imageToUpload && !imagesToUpload) {
//         setPreview(undefined)
//         return
//     }
//     else if (imagesToUpload.length) {
//       let itemWithUrlArr = imagesToUpload.map(itm => itm.url = URL.createObjectURL(itm))
//       console.log("URLS", itemWithUrlArr)
//       setPreviewArr(itemWithUrlArr)
//     }
//     else if(imageToUpload) {
//       const objectUrl = URL.createObjectURL(imageToUpload)
//       let tmpObj = {url: objectUrl}
//       setPreview(tmpObj.url)
//       console.log(preview, "single")
//     }


//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(preview)
// }, [imageToUpload])




  return (
    <Box mb="10rem" pb="10rem">
     
      <Flex>
        { uploadProgress !== null && <Progress value={uploadProgress}  size="md" colorScheme="teal.200"/>}
      </Flex>
      <form>
        <Flex justify="center" align="center">
          <InputGroup display="flex" justifyContent="center" alignItems="center" mt="10rem">
            <Input  pt="5px"type="file" multiple onChange={(e) => onUpload(e, albumId)} w="400px" textAlign="center" />
            <InputRightAddon bg="teal.400" color="white" cursor="pointer" _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
            </InputRightAddon>
          </InputGroup> 
        </Flex>
      </form>
    </Box>

  )
}

export default UploadImage
