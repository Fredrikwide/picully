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
  const { logout, login, currentUser } = useAuth()
  const handleSignOut = () => logout();
  const handleSignUp = () => navigate("/sign-up")
  return (
  
    //formik handling form state 
    <Flex justify="center" align="center">
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
            navigate("/")

        } catch (err) {
            console.log('error', err)
        }
        }}
      >
          {(props) => (
            
            <Form w={[300, 400, 560]}>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">email</FormLabel>
                    <Input 
                      {...field}
                      value={props.values.email}
                      id="email"
                      type="email"
                      placeholder="email" 
                      onChange={props.handleChange} 
                      onBlur={props.handleBlur} 
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password">password</FormLabel>
                    <Input  
                      {...field}
                      value={props.values.password}
                      id="password" 
                      type="password"
                      placeholder="password" 
                      onChange={props.handleChange} 
                      onBlur={props.handleBlur} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
           
                {

                !currentUser ?
                <>
                <Text p="10px">
                  Not a member yet? Sign up today!
                </Text>
                <Flex
                justify="space-around"
                align="center"
                direction={["column", "column", "row", "row"]}>
                  <Box>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      >
                      Sign in
                    </Button>
                  </Box>
                  <Box>
                    <Button
                        mt={4}
                        colorScheme="green"
                        onClick={handleSignUp}

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
