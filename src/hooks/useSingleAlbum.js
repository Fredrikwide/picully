import { useEffect, useState } from 'react';
import { useFire } from '../contexts/FirebaseContext';


const useSingleAlbum = (albumId) => {
  const {db, } = useFire()
	const [album, setAlbum] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
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
			.orderBy("name")
			.onSnapshot(snapshot => {
				setLoading(true);
				const imgs = [];

				snapshot.forEach(doc => {
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

export default useSingleAlbum;
