import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'

import { useAuth } from '../../contexts/AuthContext'

import NavBar from './NavBar'
import NavBarSignedIn from './NavBarSignedIn'
import NavMobile from './NavMobile'
import NavMobileSignedIn from './NavMobileSignedIn'

const NavIndex = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)")
  const {currentUser} = useAuth()

  return (
    <>
     { 
        (isLargerThan900 && !currentUser) ? <NavBar /> 
        : 
        (isLargerThan900 && currentUser) ? <NavBarSignedIn /> 
        :
        (!isLargerThan900 && !currentUser) ? <NavMobile />
        :
        <NavMobileSignedIn />
     }
    </>
  )
}

export default NavIndex
