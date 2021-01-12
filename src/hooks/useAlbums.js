import { useEffect, useState } from "react"
import { useFire } from "../contexts/FirebaseContext"

const useAlbums = () => {
  
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)
  const {db} = useFire()

	useEffect(() => {
		const unsubscribe = db.collection('albums').onSnapshot(snapshot => {
			setLoading(true)
			const snapshotAlbums = []
			snapshot.forEach(doc => {
				snapshotAlbums.push({
					id: doc.id,
					...doc.data(),
				})
			})

			setAlbums(snapshotAlbums)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return { albums, loading }
}

export default useAlbums
