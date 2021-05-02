import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'

import { Flex, Heading, Input, Spinner, Text } from '@chakra-ui/react'

import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'



const Album = () => {
  const {slug} = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const {firebaseFunctions, db, updatedAlbumTitle} = useFire()
  const { 
          imageDeleted,
          isUploaded, 
          currentAlbum,
          imagesInCurrentAlbum,
          setCurrentAlbum,
          setImagesInCurrentAlbum} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(false)
  const [editActive, setEditActive] = useState(false)


  useEffect(() => {
  (async () => {
    if(currentAlbum === undefined || !currentAlbum){
      await db.collection("albums").where("slug", "==", slug).get().then(querySnapshot => {
        let currAlb = "";
        querySnapshot.forEach(doc => {
          currAlb = doc.data()
        })
        setCurrentAlbum(currAlb)
      })
    } 
  })()
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

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
  catch (err) {
    console.log("error", err);
  }
  
  }

  useEffect(() => {
   console.log("i ran");
    (async () => {
      setImagesInCurrentAlbum("")
      setIsLoading(true)

      if(currentAlbum) {
          setCurrentAlbum(currentAlbum)
          fetchImages(currentAlbum.id)
          setIsLoading(false)
      }
      else {
        console.error("no id found")
      }

    })()
  }, [imageDeleted, isUploaded, currentAlbum])



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
   await firebaseFunctions.updateAlbumName(currentAlbum.id, editAlbumName)
    setEditActive(false)
  }

 useEffect(() => {

 }, [updatedAlbumTitle])

 
	return (
		<>

     { currentAlbum !== undefined &&

      <Flex 
        direction="column" 
        mt="3rem">
        { currentAlbum !== undefined && !isLoading &&
        <UploadImage 
          albumId={currentAlbum.id !== undefined && currentAlbum.id } 
        /> }
        <Flex 
          justify="center" 
          align="center" 
          direction="column"
        >     
          <Text>Edit album name</Text>
            <Flex 
              justify="space-around" 
              align="center" 
            >
              {editActive &&
                  <Flex 
                    justify="center" 
                    align="center"
                  >
                    <Input 
                      type="text" 
                      placeholder={editAlbumName} 
                      onChange={handleChangeAlbumName}
                      />
                  </Flex> }
              { !editActive ? 
              <Flex 
                justify="center" 
                cursor="pointer" 
                align="center" 
                _hover={{backgroundColor: "teal.300"}} 
                >
                <GrEdit 
                  color="white" 
                  size={"1.2rem"} 
                  onClick={handleEdit}  />
              </Flex>
              : 
              <Flex 
              ml="1rem" 
              justify="center" 
              cursor="pointer" 
              align="center">
                <CheckIcon  
                  _hover={{color: "teal.300"}}
                  w={6} 
                  h={6} 
                  color="teal.500" 
                  onClick={handleFinishedEdit} 
                /> 
              </Flex>}
            </Flex>
                <Heading >{editAlbumName ? editAlbumName : currentAlbum.title }</Heading>        
          </Flex>
          {
          isLoading 
          ?
          <Flex 
            justify="center" 
            align="center"
          >
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
          <ImageGrid images={imagesInCurrentAlbum} albumId={currentAlbum.id} />
          :

          <Flex justify="center" align="center">
            <Text as="i" mt="2rem">here be dragons</Text>
          </Flex>)
        }

      </Flex>
      }
		</>
	)
}

export default Album

