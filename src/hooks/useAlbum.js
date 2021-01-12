import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFire } from '../contexts/FirebaseContext';


const useAlbum = (albumId) => {
 
	const [album, setAlbum] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
  const {db} = useFire()
  const {currentUser} = useAuth()


	useEffect(() => {
    db.collection('albums').doc(albumId).get().then(doc => {
      console.log(doc.data(), "useAlbums album")
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId])

	useEffect(() => {
    
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.onSnapshot(snapshot => {
				setLoading(true);
				const imgs = [];

				snapshot.forEach(doc => {
          console.log(doc.data(), "useAlbums images")
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(imgs);
				setLoading(false);
			});

		return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId]);

	return { album, images, loading };
}

export default useAlbum;
