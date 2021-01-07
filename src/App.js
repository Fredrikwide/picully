
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
import NavBar from './components/navigation/NavBar';
import NavIndex from './components/navigation/NavIndex';
import Console from './components/console/Console';

const App = () => {
  return (
    <>
      <Router>
        <NavIndex />      
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <AuthRoute path="/console" elemnt={<Console />} />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
