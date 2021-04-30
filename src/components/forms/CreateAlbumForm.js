/* eslint-disable no-unused-vars */
import {useNavigate} from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Heading, 
} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../contexts/AuthContext";
import {  useFire } from '../../contexts/FirebaseContext';

import firebase from'firebase/app'

//Yup Validation schema for signing in
const CreateAlbumSchema = Yup.object().shape({
  //email validation rules
  name: Yup.string()
  .trim()
  .min(2, 'must be minimum och 2 characters')
  .max(140, 'max name length is 140 chars')
  .required('Please enter a valid album name'),
  //pw validation rules
  description: Yup.string()
  .min(4, 'must be minimum och 2 characters')
  .required('enter a short description')

})

const CreateAlbumForm = (pickedImages) => {
  const navigate= useNavigate()
  const { currentUser } = useAuth()
  const {firebaseFunctions} = useFire()
  const {db} = useFire()


  return (
  <>
    <Box p="1rem" mt="3rem">
      <Heading>Create a new album</Heading>
    </Box>
    <Flex 
    justify="center" 
    align="center" 
    minW={["sm", "md", "lg", "xl"]}
    minH={["sm", "md", "lg", "xl"]}
    pb="10rem"
    >
        <Formik
        initialValues={{
          name: '',
          description: '',
          owner: currentUser.uid,
          id: '',
        }}
        validationSchema={CreateAlbumSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            if(!pickedImages.length || pickedImages === undefined) {
              await firebaseFunctions.createAlbum(values.name, values.description, values.owner, values.id) // 
              setSubmitting(false)
              navigate('/console/albums')
            }
            else {
              await pickedImages.forEach((image) => {
                db.collection("images")
                .doc(image.id)
                .update({
                albums: firebase.firestore.FieldValue.arrayUnion(
                db.collection("albums").doc(pickedImages.id)
                ),
                });
                });
            }        

        } catch (err) {
            console.log('error', err)
        }
        }}
      >
          {(props) => (
            
            <Form >
              <Field name="name">
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]} mt={["sm", "md", "lg", "xl"]}>
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
                  <Box p={["sm", "md", "lg", "xl"]} mt={["sm", "md", "lg", "10px"]}>
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
    </>
  )
}

export default CreateAlbumForm
