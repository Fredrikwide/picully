
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
function App() {
  return (
    <>
      <Router>    
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
