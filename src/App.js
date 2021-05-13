import React, {useState, useEffect} from 'react';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignUp from './components/forms/SignUp';
import NavIndex from './components/navigation/NavIndex';
import CreateAlbum from './components/album/CreateAlbum';
import Albums from './components/album/Albums';
import NotFound from './components/error/NotFound';
import Album from './components/album/Album';
import SharedAlbum from './components/album/SharedAlbum';
import { useUpdate } from './contexts/UpdateContext';
import { useFire } from './contexts/FirebaseContext';

const App = () => {
  const { albumToShare, setAlbumToShare, renderShared, setRenderShared, currentUrl, setCurrentUrl } = useUpdate();
  const { firebaseFunctions, sharedAlbum, setSharedAlbum, sharedUrl, setSharedUrl } = useFire();
  const { getAlbumsByUrl, getSharedAlbumUrls, getImagesByAlbumId } = firebaseFunctions;


  const [sharedImages, setSharedImages] = useState([]);


  useEffect(() => {
    (async () => {
      const albums = await getSharedAlbumUrls();
      albums.forEach( async (url) => {
        if(currentUrl === url) {
          console.log("TRUE", url);
          setSharedUrl(url);
          getAlbumsByUrl(url);
          setRenderShared(true);
        }
      })
    })()
  }, [currentUrl, sharedUrl])



  return (
    <>
      <Router>
     
        <NavIndex />  
        <Routes>
          <Route path="/sign-up" element={<SignUp />} /> 

          <Route path="/" element={ <Home /> } />

          <Route path={`${sharedUrl}`} element={<SharedAlbum album={sharedAlbum} images={sharedImages} />} />

          <AuthRoute path="/home">
                    <AuthRoute path="albums">
                      <Albums />
                      <AuthRoute path="/:slug">
                        <Album />
                      </AuthRoute>
                      <AuthRoute path="/create">
                        <CreateAlbum />
                      </AuthRoute>
                    </AuthRoute>
            </AuthRoute>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
