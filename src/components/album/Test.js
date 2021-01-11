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
import { UpdateContext } from '../../contexts/UpdateContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';


//Yup Validation schema for signing in
const CreateAlbumSchema = Yup.object().shape({
  //email validation rules
  name: Yup.string()
  .min(2, 'must be minimum och 2 characters')
  .max(16, 'max name length is 16 chars')
  .required('Please enter a valid album name'),
  //pw validation rules
  description: Yup.string()
  .min(4, 'must be minimum och 2 characters')

  .required('enter a short description')
  // .min(8, 'password not valid')
  // .matches(/(?=.*[0-9])/, "Password must contain a number.")
})

const Test = () => {

  const { currentUser } = useAuth()
  const {firebaseFunctions} = useContext(FirebaseContext)

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
          name: '',
          description: '',
          owner: currentUser.uid
        }}
        validationSchema={CreateAlbumSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            await firebaseFunctions.createAlbum(values.name, values.description, values.owner) // 
            setSubmitting(false)
        } catch (err) {
            console.log('error', err)
        }
        }}
      >
          {(props) => (
            
            <Form >
              <Field name="name">
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]}>
                    <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                      <FormLabel color="white" htmlFor="name" p={["sm", "md", "lg", "xl"]}>name</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="white"
                        value={props.values.name}
                        id="name"
                        color="white"
                        type="name"
                        placeholder="name" 
                        onChange={props.handleChange} 
                        onBlur={props.handleBlur} 
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="description">
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]}>
                    <FormControl isInvalid={form.errors.description && form.touched.description} isRequired>
                      <FormLabel color="white" htmlFor="description" p={["sm", "md", "lg", "xl"]}>description</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="white"
                        value={props.values.description}
                        id="description"
                        color="white"
                        type="description"
                        placeholder="description" 
                        onChange={props.handleChange} 
                        onBlur={props.handleBlur} 
                      />
                      <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              
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
                      Create Album
                    </Button>
                  </Box>
                </Flex>
            </Form>
        
          )}
        </Formik>
      </Flex>
  )
}

export default Test
