import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadImage from '../forms/UploadImage'

import { Flex, Heading, Input, Spinner, Text } from '@chakra-ui/react'

import ImageGrid from '../pictureItems/ImageGrid'
import { useFire } from '../../contexts/FirebaseContext'
import {GrEdit} from 'react-icons/gr'
import {CheckIcon} from '@chakra-ui/icons'
import { useUpdate } from '../../contexts/UpdateContext'



const Album = ({current}) => {
  const {slug} = useParams()
  const [id, setId] = useState(false);
  const [thisAlbum, setThisAlbum] = useState(current);
  const [isLoading, setIsLoading] = useState(false)
  const {firebaseFunctions, db, updatedAlbumTitle} = useFire()
  const { 
          storage,
          imageDeleted,
          isUploaded,
          currentAlbum,
          imagesInCurrentAlbum,
          setCurrentAlbum,
          setImagesInCurrentAlbum} = useUpdate()
  const [editAlbumName, setEditAlbumName] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log(thisAlbum, 'THIS')
  }, [thisAlbum])


  useEffect(() => {

  (async () => {
      setLoading(true)
      setImagesInCurrentAlbum([]);
      let ref = db.collection('albums');
      let res = await ref.where('slug', '==', slug).get();
      for(const doc of res.docs){
        let docRef = doc.data();
        setCurrentAlbum(docRef)
        setId(docRef.id)
        docRef.images.forEach(img=> {
          setImagesInCurrentAlbum(prevImgs => [...prevImgs, img])
        })
        setLoading(false);
      }
  })()
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isUploaded])

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
 
	return (
		<>

     { currentAlbum !== undefined && !isLoading ?

      <Flex 
        direction="column" 
        mt="3rem">
        { currentAlbum !== undefined && !isLoading &&
        <UploadImage 
          albumId={id !== null ? id : false} 
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
          (imagesInCurrentAlbum !== undefined && imagesInCurrentAlbum.length > 0 && currentAlbum
          ? 
          <ImageGrid albumId={currentAlbum.id} pictures={imagesInCurrentAlbum}  />
          :

          <Flex justify="center" align="center">
            <Text as="i" mt="2rem">here be dragons</Text>
          </Flex>)
        }

      </Flex>
       : loading &&
       <>
         <Flex
           height="100vh"
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
           Loading
         </Flex>
       </>
      }
		</>
	)
}

export default Album

