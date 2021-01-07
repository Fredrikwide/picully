
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
import NavBar from './components/navigation/NavBar';
import NavIndex from './components/navigation/NavIndex';

const App = () => {
  return (
    <>
      <Router>
        <NavIndex />      
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <AuthRoute path="/" element={<Home />} />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
