
/* eslint-disable no-unused-vars */
import { Box, Progress, Flex, Input, Button, InputGroup, InputRightElement, InputRightAddon, Heading, Image } from '@chakra-ui/react'
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
	const [uploadProgress, setUploadProgress] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentUpload, setCurrentUpload] = useState(null)
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
            return false
        }
    }
}

useEffect(() => {
  console.log(currentUpload)
}, [currentUpload])

const uploadImageToStorage = async (e, id) => {
  e.preventDefault();
  const types = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"]
  let images = Array.from(e.target.files)

  images.forEach(async (image, index) => {
    
  if (!image || !types.includes(image.type)) {
    setUploadedImage(null);
    setIsUploaded(false)
    setCurrentUpload(null)
    setError(null);
    setIsSuccess(false);
    return;
  }
  setIsUploaded(false)
  setError(null);
  setIsSuccess(false);

  image.uploadIndex = uuidv4();


  let storageRef = storage.ref(`images/${currentUser.uid}/${albumId}/${image.uploadIndex}`)

  if(!checkIfImageIsInAlbum(`images/${currentUser.uid}/${albumId}/${image.uploadIndex}`, id)){
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
            setUploadProgress([])
        })
    })
    return
  }
  (async () => {
      const uploadTask = storageRef.put(image);


      uploadTask.on('state_changed', taskSnapshot => {
       let percentage = (Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100))
       setUploadProgress([
         {
          percentage, 
          id: index, 
          file: image,
          total: taskSnapshot.totalBytes, 
          transfered: taskSnapshot.bytesTransferred
        }
        ])
      })
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
              setUploadedImage(img);
              e.target.value = '';
              
          })
          .catch(error => {
              console.log(error)
          })
      })
    // let user know we're done
    e.target.value = '';
  })()
  })
  setUploadProgress([]);
  setIsSuccess(true);
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
            <Input accept="image/*" multiple pt="5px"type="file" onChange={(e) => uploadImageToStorage(e, albumId)} w="400px" textAlign="center" />
            <InputRightAddon bg="teal.400" color="white" cursor="pointer" _hover={{backgroundColor: "teal.200", color: "white"}}>
                Submit
            </InputRightAddon>
          </InputGroup> 
        </Flex>
      </form>
     { uploadProgress.length > 0 && 
      <Flex direction="column">
        {  
          uploadProgress.length > 0 && uploadProgress.percentage !== undefined && uploadProgress.map(({percentage}, index) => {
            <Progress key={index} mt="1rem" mb="1rem" colorScheme="teal" size="md" value={percentage}/>
          })
        }
      </Flex>}
    </>
  )
}

export default UploadImage
/* eslint-disable no-unused-vars */