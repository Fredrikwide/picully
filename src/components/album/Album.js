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


const Album = () => {
  const  {albumName} = useParams()
  const [albumArr, setAlbumArr] = useState()
  const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [albumId, setAlbumId] = useState()
  const {firebaseFunctions, currentAlbum, albumCollection, images} = useFire()
  const {currentAlbumID, setCurrentAlbumID} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(albumName)
  const [currAlbumID, setCurrAlbumID] = useState("")
  const [editActive, setEditActive] = useState(false)
  const [currAlbum, setCurrAlbum] = useState({})


  useEffect(() => {
    
  (async () => {
    let arr = await albumCollection.map(item => item )
    setAlbumArr(arr)
    const tempAlb = Object.assign({}, ...arr);
    setCurrAlbum(tempAlb)
    setCurrAlbumID(tempAlb.id)
    setCurrentAlbumID(tempAlb.id)
    if(currentAlbumID){
      console.log("true")
      await firebaseFunctions.getImagesByAlbumId(currentAlbumID)
      setIsLoading(false)
    }
    }
    )()
 
  }, [albumCollection])

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await firebaseFunctions.getAlbumByTitle(albumName)
 
    })()

  }, [currentAlbum])

  const handleEdit = () => {
    setEditActive(true) 
  }


  const handleChangeAlbumName = (e) => {
      setEditAlbumName(e.target.value)
  }

  const handleFinishedEdit = async ()=> {
   await firebaseFunctions.updateAlbumName(currAlbumID, editAlbumName)
    setEditActive(false)
  }


  const { loading } = useAlbum(albumId)

	return (
		<>
      <Flex justify="center" align="center" direction="column">
        <Heading>This is album {editAlbumName}</Heading>
          <Flex>
            <Text mr="1rem">Edit album name</Text>
            {editActive &&
                <Flex justify="center" align="center">
                  <Input type="text" onChange={handleChangeAlbumName}/>
                </Flex> }
            { !editActive ? 
            <Box  cursor="pointer" _hover={{backgroundColor: "teal.300"}} >
              <GrEdit color="white" size={"1.2rem"} onClick={handleEdit}  />
            </Box> 
            : 
            <Box  cursor="pointer" _hover={{}}>
              <CheckIcon w={8} h={8} color="teal.500" onClick={handleFinishedEdit} /> 
            </Box>}
          </Flex>
        {
        loading 
        ? 
        <Spinner   
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"  
        />
        : 
        (images !== undefined && images.length ? <ImageGrid images={images} albumName={albumName} /> : <Heading mt="2rem">No images in this album</Heading>)
			}
       { currAlbumID !== undefined && 
        <UploadImage albumId={currAlbumID} albumTitle={albumName} userId={currentUser.uid}/> }
      </Flex>
		</>
	)
}

export default Album

