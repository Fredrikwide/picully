
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
import NavBar from './components/navigation/NavBar';
import NavIndex from './components/navigation/NavIndex';
import Console from './components/console/Console';
import UploadImage from './components/forms/UploadImage';

const App = () => {
  return (
    <>
      <Router>
        <NavIndex />      
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <AuthRoute path="/console" element={<Console />} />
          <AuthRoute path="/upload" element={<UploadImage />} />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
