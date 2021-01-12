import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSingleAlbum from '../../hooks/useSingleAlbum'

import UploadImage from '../forms/UploadImage'

import { useAuth } from '../../contexts/AuthContext'
import { useFire } from '../../contexts/FirebaseContext'
import { AspectRatio, Image } from '@chakra-ui/react'

const Album = () => {
  const {currentUser} = useAuth()
	const { albumName } = useParams()
  const { album, images, loading } = useSingleAlbum(currentUser.uid)
  const {db} = useFire()
  const [imageArr, setImageArr] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const {firebaseFunctions} = useFire()

  useEffect(() => {
   console.log(album, images)
  }, []);
	return (
		<>
			<h2>Album {album && album.name}</h2>
      {images.length && images.map((image) => (
          <AspectRatio maxW="400px" ratio={4 / 3}>
            <Image src={images.src} alt="naruto" objectFit="cover"  />
          </AspectRatio>
        ))}
			<UploadImage ownerId={currentUser.uid} currentAlbum={album} />

			<hr />
		</>
	)
}

export default Album
