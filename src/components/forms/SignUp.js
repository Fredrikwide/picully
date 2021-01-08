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
import { useContext } from 'react';
import { UpdateContext } from '../../contexts/UpdateContext';


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
  const {setSignUpIsClicked} = useContext(UpdateContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleGoBack = () => setSignUpIsClicked(false)
  return (
  
    <Flex 
      justify="center" 
      align="center"
      pl={["16px", "18px", "20px", "22px"]}
      pr={["16px", "18px", "20px", "22px"]}
      pt={["20px", "18px", "20px", "22px"]}
    >
    <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={SignInSchema}
    onSubmit={async (values, { setSubmitting }) => {
      try { 
        await signup(values.email, values.password) // 
        setSubmitting(false)
        navigate("/")

    } catch (err) {
        console.log('error', err)
    }
    }}
  >
      {(props) => (
        
        <Form w={[300, 400, 560]} >
          <Field name="firstname" >
            {({ field, form }) => (
              <Box p={["sm", "md", "lg", "xl"]}>
                <FormControl isInvalid={form.errors.firstname && form.touched.firstname} isRequired>
                  <FormLabel htmlFor="firstname" color="white" fontWeight="bold" mt="16px">First Name</FormLabel>
                  <Input  
                    {...field}
                    color="white"
                    focusBorderColor="white"
                    value={props.values.firstname}
                    id="firstname" 
                    type="firstname"
                    placeholder="firstname" 
                    onChange={props.handleChange} 
                    onBlur={props.handleBlur} />
                  <FormErrorMessage>{form.errors.firstname}</FormErrorMessage>
                </FormControl>
              </Box>
            )}
          </Field>
          <Field name="lastname" >
            {({ field, form }) => (
              <Box p={["sm", "md", "lg", "xl"]}>
                <FormControl isInvalid={form.errors.lastname && form.touched.lastname} isRequired>
                  <FormLabel htmlFor="lastname" color="white" fontWeight="bold" mt="16px">Last Name</FormLabel>
                  <Input  
                    {...field}
                    color="white"
                    focusBorderColor="white"
                    value={props.values.lastname}
                    id="lastname" 
                    type="lastname"
                    placeholder="lastname" 
                    onChange={props.handleChange} 
                    onBlur={props.handleBlur} />
                  <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                </FormControl>
              </Box>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <Box p={["sm", "md", "lg", "xl"]}>
                <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                  <FormLabel color="white" htmlFor="email" mt="16px">Email</FormLabel>
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
                <FormControl isInvalid={form.errors.password && form.touched.password} isRequired>
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
          <Box m="10px" p="5px">
            <Checkbox isRequired colorScheme="green" color="white">   
              by signing up you <Text as="em">agree</Text> to our <Link as="button" color="white" onClick={onOpen}>Terms and Conditons</Link>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                    <ModalContent>
                     
                        <ModalHeader ml="10px">Terms and Conditions</ModalHeader>
                     
                        <ModalCloseButton />
                      <ModalBody>
                        <Container>
                          <Text fontSize="1em">
                            Its hands were holograms that altered to match the convolutions of the car’s floor. Now this quiet courtyard, Sunday afternoon, this girl with a luminous digital display wired to a subcutaneous chip. Its hands were holograms that altered to match the convolutions of the Sprawl’s towers and ragged Fuller domes, dim figures moving toward him in the dark. Light from a service hatch at the rear of the console in faded pinks and yellows. Why bother with the movement of the train, their high heels like polished hooves against the gray metal of the arcade showed him broken lengths of damp chipboard and the drifting shoals of waste.
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
            <Flex
            justify="space-around"
            align="center"
            direction={["column", "column", "row", "row"]}
            p={["16px", "18px", "20px", "22px"]}
            mb={["16px", "18px", "20px", "22px"]}
            >     
              <Box>
                <Button
                    mt={4}
                    color="white"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    type="submit"
                    _hover={{
                      transition: "all 0.6s ease-out",
                      color: "linear-gradient(to right, #3ebac6 0%, #8b539e 50%, #e53782 100%)"
                    }}
                >
                  Sign Up
                </Button>
              </Box>
              <Box>
                <Button
                  mt={4}
                  background="white"
                  color="teal.500"
                  pl={["26px", "28px", "30px", "32px"]}
                  pr={["26px", "28px", "30px", "32px"]}
                  isLoading={props.isSubmitting}
                  onClick={handleGoBack}
                  >
                  Close
                </Button>
              </Box>
            </Flex>           
        </Form>  
      )}
    </Formik>
  </Flex>
  )
}

export default SignUp
