
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  Center,
  Container,
} from "@chakra-ui/react"
import { useFormik } from 'formik';
const SignIn = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log('values is ',values);
    },

  });

  const handleClickSignUp = () => {
    console.log('sign up')
  }
  return (
    <Container maxW="xl" centerContent color="white">
      <FormControl id="email" onSubmit={formik.handleSubmit} w="400px" mt="16px">
        <FormLabel>Email address</FormLabel>
        <Input 
          type="email" 
          onChange={formik.handleChange} 
          value={formik.values.email} 
        />
        <FormLabel>Password</FormLabel>
        <Input 
          type="password" 
          onChange={formik.handleChange} 
          value={formik.values.password} 
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <Button type="submit">Sign In</Button>
        <Button onClick={handleClickSignUp}>Sign Up</Button>
      </FormControl>
    </Container >
  )
}

export default SignIn
