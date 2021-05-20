/* eslint-disable no-unused-vars */
import {useNavigate} from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  Center,
  Container,
  Box,
  Flex, 
  Spacer,
  Text
} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../contexts/AuthContext";
import { useContext, useState } from 'react';
import { UpdateContext, useUpdate } from '../../contexts/UpdateContext';


//Yup Validation schema for signing in
const SignInSchema = Yup.object().shape({
  //email validation rules
  email: Yup.string()
  .email('invalid email.')
  .required('Please enter a valid email'),
  //pw validation rules
  password: Yup.string()
  .required('A valid password is required')
  // .min(8, 'password not valid')
  // .matches(/(?=.*[0-9])/, "Password must contain a number.")
})

const SignIn = () => {
  const navigate = useNavigate()
  const {signupIsClicked, setSignUpIsClicked, setUserLoggedIn} = useUpdate();
  const { logout, login, currentUser } = useAuth()
  const handleSignOut = () => logout();
  const handleSignUp = () => setSignUpIsClicked(!signupIsClicked)
  return (
  
    
    //formik handling form state 
    <Flex 
    justify="center" 
    align="center" 
    minW={["sm", "md", "lg", "xl"]}
    minH={["sm", "md", "lg", "xl"]}
    >
        <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            await login(values.email, values.password) // 
            setSubmitting(false)
            setUserLoggedIn(true)
            navigate("home/albums")

        } catch (err) {
            console.log('error', err)
        }
        }}
      >
          {(props) => (
            
            <Form >
              <Field name="email">
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]}>
                    <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                      <FormLabel color="white" htmlFor="email" p={["sm", "md", "lg", "xl"]}>Email</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="white"
                        value={props.values.email}
                        id="email"
                        color="white"
                        type="email"
                        placeholder="email" 
                        onChange={props.handleChange} 
                        onBlur={props.handleBlur} 
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="password" >
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]}>
                    <FormControl isInvalid={form.errors.password && form.touched.password} isRequired >
                      <FormLabel htmlFor="password" color="white" fontWeight="bold" mt="16px">Password</FormLabel>
                      <Input  
                        {...field}
                        color="white"
                        focusBorderColor="white"
                        value={props.values.password}
                        id="password" 
                        type="password"
                        placeholder="password" 
                        onChange={props.handleChange} 
                        onBlur={props.handleBlur} />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
           
                {

                !currentUser ?
                <>
                <Container p="10px"  mt="14px">
                  <Text as="i" color="white">
                    Not a member yet? Sign up today!
                  </Text>
                </Container>
                <Flex
                justify="space-around"
                align="center"
                direction={["row", "row", "row", "row"]}>
                  <Box>
                    <Button
                      mt={4}
                      background="white"
                      p={["20.2px", "md", "lg", "xl"]}
                      color="teal.500"
                      isLoading={props.isSubmitting}
                      type="submit"
                      >
                      Sign in
                    </Button>
                  </Box>
                  <Box>
                    <Button
                        mt={4}
                        color="white"
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        onClick={handleSignUp}
                        _hover={{
                          transition: "all 0.6s ease-out",
                          color: "linear-gradient(to right, #3ebac6 0%, #8b539e 50%, #e53782 100%)"
                        }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Flex>
                </>
                :
                <Button onClick={handleSignOut}>Sign Out</Button>
                }
             
            
            </Form>
        
          )}
        </Formik>
      </Flex>
  )
}

export default SignIn
