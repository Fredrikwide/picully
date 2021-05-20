
// const addImageToAlbumsArray = (img, id) => {
//   try {
//     db.collection('albums').doc(id).update({
//       images: firebase.firestore.FieldValue.arrayUnion(img)
//   });
//   } catch (error) {
//    console.log(error) 
//   }
// }

// const checkIfImageIsInAlbum = (imagePath, id) => {
// db.collection("albums").doc(id).get()
// .then(doc => {
//     for (let i = 0; i < doc.data().images.length; i++) {
//         if(doc.data().images[i].path === imagePath) {
//             console.error('This image is already in the album');
//             return
//         }
//     }
// })
// }

// export const uploadImageToStorage = (image, id) => {
//   let storageRef = storage.ref(`images/${currentUser.uid}/${image.name}`)

//   checkIfImageIsInAlbum(`images/${currentUser.uid}/${image.name}`, id)

//   // Check if the ref already exists
//   storageRef.getMetadata()
//   .then(() => {
//       // If the ref already exists:
//       storageRef.getMetadata().then((metadata) => {
//           const img = {
//               name: metadata.name,
//               path: metadata.fullPath,
//               size: metadata.size,
//               type: metadata.type,
//               url: metadata.customMetadata.url,
//           };

//           addImageToDb(img, id)
//       })
//   })
//   .catch(() => {
//       // If the ref does not exist:
//       const uploadTask = storageRef.put(image);
      
//       uploadTask.then(async() => {
//           const url = await storageRef.getDownloadURL()
//           const newMetadata = {
//               customMetadata : {
//                   url
//               }
//           }

//           storageRef.updateMetadata(newMetadata).then(metadata => {
//               const img = {
//                   name: metadata.name,
//                   path: metadata.fullPath,
//                   size: metadata.size,
//                   type: metadata.type,
//                   url: metadata.customMetadata.url,
//               };

//               addImageToAlbumsArray(img, id)
//           })
//           .catch(error => {
//               setError(error)
//           })
//       }) 
//   })
// }

