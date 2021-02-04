import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SharedImageGrid from '../pictureItems/SharedImageGrid'
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useFire } from '../../contexts/FirebaseContext'
/* eslint-disable no-unused-vars */



const SharedAlbum = ({album, images}) => {

  const  {albumId} = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const {db} = useFire()
  const [pics, setPics] = useState([])

  const fetchImages = async (id) => {
    try {
    await db.collection("images").where("albums", "array-contains", db.collection("albums").doc(id)).get().then(snapshot => {
      setIsLoading(true)
      let imgArr = []
      snapshot.forEach(doc => {
        imgArr.push(doc.data())
      })
      setPics(prevPics => [...prevPics, imgArr])
      setIsLoading(false)
    })
  }
  catch (error) {
    console.log(error)
  }
  
  }

  useEffect(() => {
   
    (async () => {

      setIsLoading(true)

      if(album) {
          fetchImages(album.id)
          setIsLoading(false)
      }
      else {
        console.error("no id found")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [album])


	return (
      <Flex 
        direction="column" 
        mt="3rem">
        { 

        album !== undefined && !isLoading 
        ?
          <Flex justify="center" align="center" >
            <Heading >{album.title }</Heading>
          </Flex>   
          :
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
          (images !== undefined && images.length 
          ? 
          <SharedImageGrid images={pics} albumId={album.id} />
          :

          <Flex justify="center" align="center">
            <Text as="i" mt="2rem">here be dragons</Text>
          </Flex>)
        }
      </Flex>

	)
}

export default SharedAlbum

