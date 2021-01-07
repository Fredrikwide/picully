import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import NavMobile from './NavMobile'

const NavIndex = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)")
  return (
    <>
      {
        isLargerThan900 ? <NavBar /> : <NavMobile />
      }
    </>
  )
}

export default NavIndex
