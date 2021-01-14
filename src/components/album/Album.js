import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'
import { useAuth } from '../../contexts/AuthContext'
import { AspectRatio, Box, Flex, Heading, Image, Input, Spinner, Text } from '@chakra-ui/react'
import useAlbum from '../../hooks/useAlbum'
import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'
import PreviewImageGrid from '../pictureItems/PreviewImageGrid'
import useAlbums from '../../hooks/useAlbums'


const Album = () => {
  const  {albumName} = useParams()
  const [albumArr, setAlbumArr] = useState()
  const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [albumId, setAlbumId] = useState()
  const {firebaseFunctions, currentAlbum, albumCollection, images,} = useFire()
  const {currentAlbumID, setCurrentAlbumID} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(albumName)
  const [currAlbumID, setCurrAlbumID] = useState("")
  const [editActive, setEditActive] = useState(false)
  const [currAlbum, setCurrAlbum] = useState({})



  useEffect(() => {

  (async () => {
    setIsLoading(true)
    let arr = await albumCollection.map(item => item )
    console.log(arr)
    setAlbumArr(arr)
    const tempAlb = Object.assign({}, ...arr);
    console.log("ALBUM", tempAlb.id)
    setCurrAlbum(tempAlb.id)
    let res = await firebaseFunctions.getImages()
    console.log("PLEASE", images)
    }
    )()
    setIsLoading(false)
  }, [albumCollection])
  

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await firebaseFunctions.getAlbumByTitle(albumName)
 
    })()
    setIsLoading(false)
  }, [currentAlbum])

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
    let arr = await albumCollection.map(item => item )
    console.log(arr)
    setAlbumArr(arr)
    const tempAlb = Object.assign({}, ...arr);
    console.log("ALBUM", tempAlb.id)
    setCurrAlbumID(tempAlb.id)
    console.log(currAlbumID, "curr", "current", currentAlbumID)
   await firebaseFunctions.updateAlbumName(tempAlb.id, editAlbumName)
    setEditActive(false)
  }


 

	return (
		<>
      <Flex direction="column" mt="3rem">
       <Flex justify="center" align="center" direction="column">
            <Text>Edit album name</Text>
            {editActive &&
                <Flex justify="center" align="center">
                  <Input type="text" onChange={handleChangeAlbumName}/>
                </Flex> }
            { !editActive ? 
            <Flex justify="center" cursor="pointer" Align="center" _hover={{backgroundColor: "teal.300"}} >
              <GrEdit color="white" size={"1.2rem"} onClick={handleEdit}  />
            </Flex> 
            : 
            <Flex  justify="center" cursor="pointer" Align="center" _hover={{backgroundColor: "teal.300"}}>
              <CheckIcon w={8} h={8} color="teal.500" onClick={handleFinishedEdit} /> 
            </Flex>}
              <Heading isTruncated>{editAlbumName}</Heading> 
          
        </Flex>
        {
        isLoading 
        ? 
        <Spinner   
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"  
        />
        : 
        (images !== undefined && images.length ? <ImageGrid images={images} /> : <Heading mt="2rem">No images in this album</Heading>)
			}
       </Flex>
       { currAlbumID !== undefined && 
        <UploadImage albumId={currAlbumID} albumTitle={albumName} userId={currentUser.uid}/> }
     
		</>
	)
}

export default Album

