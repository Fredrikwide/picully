import { useEffect } from 'react';
import { useFire } from '../contexts/FirebaseContext';


const DeleteImg = (image) => {
  const {db, storage} = useFire()
	useEffect(() => {
		if (!image) {
			return;
		}
		(async () => {
			await db.collection('images').doc(image.id).delete();
      await storage.ref(image.path).delete();
      console.log("deleted")
		})();
	}, [image]);

	return {}
}

export default DeleteImg
