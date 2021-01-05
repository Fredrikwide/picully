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
  Spacer
} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../contexts/AuthContext";


const SignInSchema = Yup.object().shape({
  //email validation rules
  email: Yup.string()
  .email('invalid email.')
  .required('Please enter a valid email'),
  //pw validation rules
  password: Yup.string()
  .required('A valid password is reuired')
  // .min(8, 'password not valid')
  // .matches(/(?=.*[0-9])/, "Password must contain a number.")
})

const SignUp = () => {
  const navigate = useNavigate()
  const { SignUp } = useAuth()

  return (
  
   
        <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            await SignUp(values.email, values.password)
            setSubmitting(false)
            navigate("/")

        } catch (err) {
            
            console.log('error', err)
        }
        }}
      >
          {(props) => (
            
            <Form>
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
              <Center>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Center>
            </Form>
        
          )}
        </Formik>

  )
}

export default SignUp
