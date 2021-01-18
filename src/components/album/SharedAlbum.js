import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'
import { useAuth } from '../../contexts/AuthContext'
import { Flex, Heading, Input, Spinner, Text } from '@chakra-ui/react'

import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'



const SharedAlbum = () => {
  const  {slug, uniqNum} = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const {firebaseFunctions, db, updatedAlbumTitle} = useFire()
  const { 
          imageDeleted,
          isUploaded, 
          albumToshare,
          setAlbumToShare,
          sharedIamges,
          setSharedImages,
          setAlbumToshare} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(false)
  const [editActive, setEditActive] = useState(false)


  useEffect(() => {
  (async () => {
    if(albumToshare === undefined || !albumToshare){
      await db.collection("albums").where("slug", "==", slug).get().then(querySnapshot => {
        let currAlb = "";
        querySnapshot.forEach(doc => {
          currAlb = doc.data()
        })
        setAlbumToShare(currAlb)
      })
    } 
  })()
 
}, [])

  const fetchImages = async (id) => {
    try {
    await db.collection("images").where("albums", "array-contains", db.collection("albums").doc(id)).get().then(snapshot => {
      setIsLoading(true)
      let imgArr = []
      snapshot.forEach(doc => {
        imgArr.push(doc.data())
      })
      setSharedImages([...imgArr])
      setIsLoading(false)
    })
  }
  catch {
    console.log("error")
  }
  
  }


  useEffect(() => {
   
    (async () => {

      setIsLoading(true)

      if(albumToshare) {
        setAlbumToShare(albumToshare)
          fetchImages(albumToshare.id)
          setIsLoading(false)
      }
      else {
        console.error("no id found")
      }
    })()
    
  }, [imageDeleted, isUploaded, albumToshare])



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
   await firebaseFunctions.updateAlbumName(albumToshare.id, editAlbumName)
    setEditActive(false)
  }

 useEffect(() => {

 }, [updatedAlbumTitle])

	return (
		<>

     { albumToshare !== undefined &&

      <Flex 
        direction="column" 
        mt="3rem">
        { albumToshare !== undefined && !isLoading &&
        <UploadImage 
          albumId={albumToshare.id !== undefined && albumToshare.id } 
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
                <Heading >{editAlbumName ? editAlbumName : albumToshare.title }</Heading>        
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
          (sharedIamges !== undefined && sharedIamges.length 
          ? 
          <ImageGrid images={sharedIamges} albumId={albumToshare.id} />
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

