
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignUp from './components/forms/SignUp';
import NavIndex from './components/navigation/NavIndex';
import Console from './components/console/Console';
import CreateAlbum from './components/album/CreateAlbum';
import Albums from './components/album/Albums';
import NotFound from './components/error/NotFound';
import Album from './components/album/Album';

const App = () => {
  return (
    <>
      <Router>
        <NavIndex />      
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <AuthRoute path="/console">
            <Console />
                  <AuthRoute path="albums">
                    <Albums />
                    <AuthRoute path=":albumName">
                      <Album />
                    </AuthRoute>
                    <AuthRoute path="/create">
                      <CreateAlbum />
                    </AuthRoute>
                    <AuthRoute path=":albumName/upload">
                      <Album />
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
