
import { Box, Flex, Link, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Albums from '../album/Albums'

const Console = () => {



  return (
    <>
    <Albums />
    </>
 
  )
}

export default Console
