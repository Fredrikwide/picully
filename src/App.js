import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignUp from './components/forms/SignUp';
import NavIndex from './components/navigation/NavIndex';
import CreateAlbum from './components/album/CreateAlbum';
import Albums from './components/album/Albums';
import NotFound from './components/error/NotFound';
import Album from './components/album/Album';
import Welcome from './components/Welcome';
import SharedImageGrid from './components/pictureItems/SharedImageGrid';
import { useUpdate } from './contexts/UpdateContext';
import { useFire } from './contexts/FirebaseContext';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { albumToShare, setAlbumToShare, renderShared, setRenderShared, currentUrl, setCurrentUrl, userLoggedIn, currentAlbum} = useUpdate();
  const { firebaseFunctions, sharedUrl, setSharedUrl, albums, db, } = useFire();
  const { getAlbumsByUrl, getSharedAlbumUrls, getImagesByAlbumUrl, getImagesByAlbumId } = firebaseFunctions;
  const { currentUser } = useAuth();


  useEffect(() => {
    const getUrls = async () => {
      await getSharedAlbumUrls();
    }
    getUrls()
  }, [currentUrl])

  useEffect(() => {
    console.log(currentAlbum, 'current album')
  }, [currentAlbum])

  return (
    <>
      <Router>
     
        { <NavIndex /> }
        <Routes>

          <Route path={"/"} element={!currentUser ? <Welcome /> : <Navigate to="/home/albums" /> } />

          {<Route path={`/review/:id`} element={<SharedImageGrid ALBUM_ID={sharedUrl !== '' && sharedUrl} />} />}

            <AuthRoute path="/home">
                    <AuthRoute path="albums">
                      <Albums />
                     <AuthRoute path="/:slug">
                        <Album current={currentAlbum}  />
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
