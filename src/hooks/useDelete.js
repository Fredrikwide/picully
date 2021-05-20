import { useEffect } from 'react';
import { useFire } from '../contexts/FirebaseContext';
import firebase from 'firebase'

const useDelete = (image, id) => {
  const {db, storage} = useFire()
	useEffect(() => {
		if (!image) {
			return;
		}
		(async () => {
			let ref = db.collection('albums').doc(id);
			await ref.update({
				images: firebase.firestore.FieldValue.arrayRemove(image)
			})
			await db.collection('images').doc(image.id).delete();
      await storage.ref(image.path).delete();
      console.log("deleted")
		})();
	}, [image]);

	return {}
}

export default useDelete
