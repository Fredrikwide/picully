import { useEffect, useState } from "react"
import { useFire } from "../contexts/FirebaseContext"

const useAlbums = (id) => {
  
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)
  const {db} = useFire()

	useEffect(() => {
		const unsubscribe = db.collection('albums').onSnapshot(snapshot => {
			setLoading(true)
			const snapshotAlbums = []
			snapshot.forEach(doc => {
				if(id === doc.owner_id){
					console.log("TRUE")
				}
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
