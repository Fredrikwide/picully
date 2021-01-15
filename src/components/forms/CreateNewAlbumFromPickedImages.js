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
import { useState } from 'react';
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

const CreateAlbumForm = ({pictures}) => {
  const navigate= useNavigate()
  const { currentUser } = useAuth()
  const {firebaseFunctions, isLoading} = useFire()
  const {timestamp,db} = useFire()
  const [error, setError] = useState("")





  return (
  <>
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
            if(!pictures.length || pictures === undefined) {
              await firebaseFunctions.createAlbum(values.name, values.description, values.owner, values.id) // 
              setSubmitting(false)
              navigate('/console/albums')
            }
            else {
              try {
                
                await firebaseFunctions.createAlbum(values.name, values.description, values.owner, values.id)
                
                
                await pictures.forEach((pic) => {
                  console.log(pic)
                  db.collection("images")
                    .update({
                      albums: firebase.firestore.FieldValue.arrayUnion(
                        db.collection("albums").where("owner_id", "==", currentUser.uid)
                      ),
                    });
                });
              } catch (error) {
                setError(error.message);
              }
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
                      <FormLabel color="teal.500" htmlFor="name" p={["sm", "md", "lg", "xl"]}>name</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="teal.500"
                        value={props.values.name}
                        id="name"
                        color="teal.500"
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
                      <FormLabel color="teal.500" htmlFor="description" p={["sm", "md", "lg", "xl"]}>description</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="teal"
                        value={props.values.description}
                        id="description"
                        color="teal.500"
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
              
                  <Box>
                    <Button
                      mt={4}
                      background="teal.200"
                      p={["20.2px", "md", "lg", "xl"]}
                      color="teal.500"
                      isLoading={props.isSubmitting}
                      type="submit"
                      >
                      Create Album
                    </Button>
                  </Box>
              
            </Form>
        
          )}
        </Formik>
      </Flex>
    </>
  )
}

export default CreateAlbumForm
