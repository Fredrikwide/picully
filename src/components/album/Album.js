import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'
import { useAuth } from '../../contexts/AuthContext'
import { Flex, Heading, Input, Spinner, Text } from '@chakra-ui/react'

import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'


const Album = () => {
  const  {albumName} = useParams()
  const [albumArr, setAlbumArr] = useState()
  const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const {firebaseFunctions, albumCollection, images,} = useFire()
  const {currentAlbumID,imageDeleted, isUploaded, setCurrentAlbumID,imagesInCurrentAlbum, setImagesInCurrentAlbum} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState()
  const [editActive, setEditActive] = useState(false)
  const {db} = useFire()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchImages = async (id) => {
    try {
    await db.collection("images").where("albums", "array-contains", db.collection("albums").doc(id)).get().then(snapshot => {
      setIsLoading(true)
      let imgArr = []
      snapshot.forEach(doc => {
        imgArr.push(doc.data())
      })
      setImagesInCurrentAlbum([...imgArr])
      setIsLoading(false)
    })
  }
  catch {
    console.log("error")
  }
  
  }

  


  useEffect(() => {
   
    (async () => {
      setImagesInCurrentAlbum("")
      setIsLoading(true)
     await db.collection("albums").where("title", "==", albumName).get().then(snapShot => {
      let albId = ""
        snapShot.forEach(doc => {
          albId = doc.data().id
        })
        setCurrentAlbumID(albId)
        fetchImages(albId)
        setIsLoading(false)
      })
    })()
    
  }, [imageDeleted, isUploaded])


  useEffect(() => {
    ( async () => {
        console.log(currentAlbumID, "ALBUM ID")
        if(currentAlbumID !== undefined) {
            let ref = db.collection("images").where("album", "==", currentAlbumID)
        await ref.get().then(snapshot => {
                let albumImages = []
                snapshot.forEach(doc => {
                    console.log(doc.data(), "I RAN")
                    albumImages.push(doc.data())
                    setImagesInCurrentAlbum(albumImages)
                })
            })
        }
    }

    )()
}, [imageDeleted, isUploaded])

  const handleEdit = () => {
    setEditActive(true) 
  }


  const handleChangeAlbumName = (e) => {
      setEditAlbumName(e.target.value)
  }

  const handleFinishedEdit = async ()=> {
    if(!editAlbumName) {
      return 
    }
   await firebaseFunctions.updateAlbumName(currentAlbumID, editAlbumName)
    setEditActive(false)
   
    
  }

 

	return (
		<>
      <Flex direction="column" mt="3rem">
        { currentAlbumID !== undefined && !isLoading &&
        <UploadImage albumId={currentAlbumID} albumTitle={albumName} userId={currentUser.uid}/> }
        <Flex justify="center" align="center" direction="column">     
              <Text>Edit album name</Text>
              <Flex justify="space-around" align="center" >
              {editActive &&
                  <Flex justify="center" align="center">
                    <Input type="text" placeholder={albumName} onChange={handleChangeAlbumName}/>
                  </Flex> }
              { !editActive ? 
              <Flex justify="center" cursor="pointer" align="center" _hover={{backgroundColor: "teal.300"}} >
                <GrEdit color="white" size={"1.2rem"} onClick={handleEdit}  />
              </Flex>
              : 
              <Flex ml="1rem" justify="center" cursor="pointer" align="center">
                <CheckIcon  _hover={{color: "teal.300"}} w={6} h={6} color="teal.500" onClick={handleFinishedEdit} /> 
              </Flex>}
            </Flex>
                <Heading >{!editActive ? albumName : editActive && editAlbumName && editAlbumName}</Heading>        
          </Flex>
          {
          isLoading 
          ?
          <Flex justify="center" align="center">
          <Spinner   
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"  
          />
          </Flex>
          : 
          (imagesInCurrentAlbum !== undefined && imagesInCurrentAlbum.length 
          ? 
          <ImageGrid images={imagesInCurrentAlbum} albumId={currentAlbumID} />
          :
          <Flex justify="center" align="center">
            <Text as="i" mt="2rem">here be dragons</Text>
          </Flex>)
        }

      </Flex>
		</>
	)
}

export default Album

