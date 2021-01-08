import { Button } from '@chakra-ui/react'
import React from 'react'

const SignUpButton = () => {
  return (
    <Button
        mt={4}
        color="white"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        type="submit"
        _hover={{
          transition: "all 0.6s ease-out",
          color: "linear-gradient(to right, #3ebac6 0%, #850%, #e53782 100%)"
        }}
      >
      Sign Up
    </Button>
  )
}

export default SignUpButton
