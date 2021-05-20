import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'

import { Flex, Heading, Input, Spinner, Text } from '@chakra-ui/react'

import SharedImageGrid from '../pictureItems/SharedImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'



const SharedAlbum = ({album}) => {
  const {id} = useParams()
  
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
          <SharedImageGrid images={imagesInCurrentAlbum} albumId={currentAlbum.id} />
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

export default SharedAlbum

