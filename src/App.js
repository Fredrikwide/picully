import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';
import ThemeToggler from './components/ThemeToggler';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';
import SignIn from './components/forms/signin';
import SignUp from './components/forms/SignUp';
function App() {
  return (
    <>
    <Router>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <ThemeToggler />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <AuthRoute path="/" element={<Home />} />
          </Routes> 
        </ColorModeProvider>
      </ThemeProvider>
    </Router>
    </>
  );
}

export default App;
