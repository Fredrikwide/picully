import { useState, useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext'
import { useFire } from '../contexts/FirebaseContext';

const useUploadImage = (image, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
	const { currentUser } = useAuth()
  const { db, storage, timestamp } = useFire()

	useEffect(() => {
		if (!image) {
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);

			return;
		}

		// reset environment
		setError(null);
		setIsSuccess(false);

    // get file reference
    const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);

		// upload image to fileRef
		const uploadTask = fileRef.put(image);

		// attach listener for `state_changed`-event
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

		// are we there yet?
		uploadTask.then(async snapshot => {

			// retrieve URL to uploaded file
			const url = await snapshot.ref.getDownloadURL();

			// add uploaded file to db
			const img = {
				title: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
				type: image.type,
				url,
			};

			// get docRef to album (if set)
			if (albumId) {
				img.album = db.collection('albums').doc(albumId)
			}

			// add image to collection
			await db.collection('images').add(img)

			// let user know we're done
			setIsSuccess(true);
			setUploadProgress(null);

			// file has been added to db, refresh list of files
			setUploadedImage(img);
			setIsSuccess(true);

		}).catch(error => {
			console.error("File upload triggered an error!", error);
			setError({
				type: "warning",
				msg: `Image could not be uploaded due to an error (${error.code})`
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image, currentUser]);

	return { uploadProgress, uploadedImage, error, isSuccess };
}

export default useUploadImage;
