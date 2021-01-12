import { useState, useEffect } from 'react';
import { useFire } from '../contexts/FirebaseContext';


const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const {db} = useFire()
  useEffect(() => {
    const unsub = db.collection(collection)
      .orderBy('createdAt')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}

export default useFirestore;