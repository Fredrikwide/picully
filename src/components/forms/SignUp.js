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
  Checkbox,
  Text,
  Popover,
  PopoverTrigger,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link
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
  .min(8, 'password not valid')
  .matches(/(?=.*[0-9])/, "Password must contain a number.")
})

const SignUp = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  
    <Flex justify="center" align="center">
        <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            await signup(values.email, values.password)
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
              <Box>
                <Checkbox isRequired colorScheme="green">   
                    by signing up you <strong>agree</strong> to our <Link as="button" color="teal.500" onClick={onOpen}>Terms and Conditons</Link>

                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Terms and Conditons</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Container>
                                  <Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis laborum placeat ex animi earum cupiditate est reprehenderit ea quam?
                                  </Text>
                                </Container>
                              </ModalBody>
                              <Center>
                                <ModalFooter>
                                    <Button colorScheme="teal" onClick={onClose}>
                                      Close
                                    </Button>
                                </ModalFooter>
                              </Center>
                            </ModalContent>
                          </Modal>
                </Checkbox>
              </Box>
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
      </Flex>
  )
}

export default SignUp
