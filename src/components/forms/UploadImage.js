
/* eslint-disable no-unused-vars */
import { Box, Flex, Input, Button, InputGroup, InputRightElement, InputRightAddon, Progress, Heading, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFire } from '../../contexts/FirebaseContext'
import firebase from 'firebase'
import {uploadImageToStorage, prog} from './NewUpload'
import { useAuth } from '../../contexts/AuthContext'

import { useUpdate } from '../../contexts/UpdateContext'
import {v4 as uuidv4} from 'uuid'

const UploadImage = ({albumId}) => {
  
  const [imageToUpload, setImageToUpload] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
	const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth()
  const { db, storage, timestamp, firestoreFunctions } = useFire()
  const {setIsUploaded} = useUpdate()

  
const addImageToAlbumsArray = async (img, id) => {
  try {
    let ref = db.collection('albums').doc(id)
   await ref.update({
      images: firebase.firestore.FieldValue.arrayUnion(img),
      docId: id
  });
  } catch (error) {
   console.log(error) 
  }
}



const checkIfImageIsInAlbum = async (imagePath, id) => {
let ref = db.collection("albums").doc(id);
let res = await ref.get()
await ref.update({
  docId: id
})
for (let i = 0; i < res.data().images.length; i++) {
        if(res.data().images[i].path === imagePath) {
            console.error('This image is already in the album');
            return
        }
    }
}

const uploadImageToStorage = (e, id) => {

  e.preventDefault();
  const types = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"]
  let image = e.target.files[0]

  if (!image || !types.includes(image.type)) {
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


  let storageRef = storage.ref(`images/${currentUser.uid}/${albumId}/${image.name}`)

  checkIfImageIsInAlbum(`images/${currentUser.uid}/${albumId}/${image.name}`, id)

  // Check if the ref already exists
  storageRef.getMetadata()
  .then(() => {
      // If the ref already exists:
      storageRef.getMetadata().then((metadata) => {
          const img = {
              id,
              key: uuidv4(),
              title: metadata.name,
              path: metadata.fullPath,
              owner: currentUser.uid,
              size: metadata.size,
              type: metadata.type,
              url: metadata.customMetadata.url,
          };

          addImageToAlbumsArray(img, id);
          e.target.value = ''
          setIsSuccess(true);
          setIsUploaded(true)
      })
  })
  .catch(() => {
      // If the ref does not exist:
      const uploadTask = storageRef.put(image);

     uploadTask.on('state_changed', taskSnapshot => {
        setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
      });

      
      uploadTask.then(async() => {
          const url = await storageRef.getDownloadURL()
          const newMetadata = {
              customMetadata : {
                  url
              }
          }

          storageRef.updateMetadata(newMetadata).then(metadata => {
              const img = {
                  id,
                  key: uuidv4(),
                  title: metadata.name,
                  path: metadata.fullPath,
                  size: metadata.size,
                  type: metadata.type,
                  owner: currentUser.uid,
                  url: metadata.customMetadata.url,
              };

              if (id) {    
                img.albums = []
                img.albums.push(db.collection('albums').doc(id))
              }
              addImageToAlbumsArray(img, id);
              setUploadProgress(null);
              setUploadedImage(img);
              setIsSuccess(true);
              e.target.value = '';
              
          })
          .catch(error => {
              console.log(error)
          })
      })
    // let user know we're done

  })
}

  useEffect(() => {
   if(isSuccess) {
     setImageToUpload({})
     setIsUploaded(true)
   }
   else if(error) {
     console.log(error)
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, uploadProgress, isSubmitting])

  return (
    <>
      <form>
        <Flex justify="center" align="center">
          <InputGroup display="flex" justifyContent="center" alignItems="center" >
            <Input  pt="5px"type="file" onChange={(e) => uploadImageToStorage(e, albumId)} w="400px" textAlign="center" />
            <InputRightAddon bg="teal.400" color="white" cursor="pointer" _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
            </InputRightAddon>
          </InputGroup> 
        </Flex>
      </form>
      {uploadProgress !== null && <Progress mt="1rem" mb="1rem" colorscheme="teal" size="md" value={uploadProgress}/>}
    </>
  )
}

export default UploadImage
/* eslint-disable no-unused-vars */