
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
import SharedAlbum from './components/album/SharedAlbum';

const App = () => {
  return (
    <>
      <Router>
        <NavIndex />      
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/:slug/:picully" element={<SharedAlbum />} />
          <AuthRoute path="/console">
            <Console />
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
