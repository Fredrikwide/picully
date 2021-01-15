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
  const {firebaseFunctions, albumCollection, images,} = useFire()
  const {currentAlbumID, isUploaded, setCurrentAlbumID,imagesInCurrentAlbum, setImagesInCurrentAlbum} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(albumName)
  const [editActive, setEditActive] = useState(false)
  const {db} = useFire()

  const fetchImages = async (id) => {
    try {
    await db.collection("images").where("albums", "array-contains", db.collection("albums").doc(id)).get().then(snapshot => {
      setIsLoading(true)
      let imgArr = []
      snapshot.forEach(doc => {
        console.log("IMAGES IN THIS ALBUM", doc.data())
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
      console.log(albumName, "NAME")
      setIsLoading(true)
     await db.collection("albums").where("title", "==", editAlbumName).get().then(snapShot => {
      let albId = ""
        snapShot.forEach(doc => {
          console.log("test")    
          console.log(doc.data().id)
          albId = doc.data().id
        })
        setCurrentAlbumID(albId)
        fetchImages(albId)
        setIsLoading(false)
      })
    })()
    
  }, [isUploaded])


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
}, [])

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

    setAlbumArr(arr)
    const tempAlb = Object.assign({}, ...arr);

    setCurrentAlbumID(tempAlb.id)
  
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
            <Flex justify="center" cursor="pointer" align="center" _hover={{backgroundColor: "teal.300"}} >
              <GrEdit color="white" size={"1.2rem"} onClick={handleEdit}  />
            </Flex> 
            : 
            <Flex  justify="center" cursor="pointer" align="center" _hover={{backgroundColor: "teal.300"}}>
              <CheckIcon w={8} h={8} color="teal.500" onClick={handleFinishedEdit} /> 
            </Flex>}
              <Heading >{editAlbumName}</Heading> 
          
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
        (imagesInCurrentAlbum !== undefined && imagesInCurrentAlbum.length ? <ImageGrid images={imagesInCurrentAlbum} /> :
        <Flex justify="center" align="center">
          <Text as="i" mt="2rem">here be dragons</Text>
        </Flex>)
			}
       </Flex>
        { currentAlbumID !== undefined && !isLoading &&
        <UploadImage albumId={currentAlbumID} albumTitle={albumName} userId={currentUser.uid}/> }
     
		</>
	)
}

export default Album

