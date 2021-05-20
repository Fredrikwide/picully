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
} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../contexts/AuthContext";
import {  useFire } from '../../contexts/FirebaseContext';
import { v4 as uuidv4} from 'uuid'
import { useUpdate } from '../../contexts/UpdateContext';

//Yup Validation schema for signing in
const CreateAlbumSchema = Yup.object().shape({
  //email validation rules
  title: Yup.string()
  .trim()
  .min(2, 'must be minimum och 2 characters')
  .max(140, 'max name length is 140 chars')
  .required('Please enter a valid album name'),
  //pw validation rules
  description: Yup.string()
  .min(2, 'must be minimum och 2 characters')
  .required('enter a short description')

})

const CreateAlbumForm = ({docId, uid, pictures}) => {
  const navigate= useNavigate()
  const { currentUser } = useAuth();
  const { firebaseFunctions } = useFire();
  let num = uuidv4()
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
            title: '',
            description: '',
            ownerId: currentUser !== null ? currentUser.uid : uid,
            images: (pictures !== undefined && pictures.length > 0) ? pictures : [],
            slug: '',
            docId: docId !== undefined ? docId : '',
            id: ''
          }}
          validationSchema={CreateAlbumSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
          try { 
            if(pictures !== undefined && pictures.length > 0) {

             await firebaseFunctions.createAlbumWithImages(values.title, values.description, values.ownerId, values.id, values.images)
             setSubmitting(false)
             navigate('/home/albums')
             resetForm({})
             pictures = [];
            }
            else {
              await firebaseFunctions.createAlbum(values.title,  values.description, values.ownerId, values.id) // 
              setSubmitting(false)
              navigate('/home/albums')
              resetForm({})
              }    
            } catch (err) {
                console.log('error', err)
            }
            }}
      >
          {(props) => (
            
            <Form >
              <Field name="title">
                {({ field, form }) => (
                  <Box p={["sm", "md", "lg", "xl"]} mt={["sm", "md", "lg", "xl"]}>
                    <FormControl isInvalid={form.errors.title && form.touched.title} isRequired>
                      <FormLabel color="teal.500" htmlFor="title" p={["sm", "md", "lg", "xl"]}>title</FormLabel>
                      <Input 
                        {...field}
                        focusBorderColor="teal.500"
                        value={props.values.title}
                        id="title"
                        color="teal.500"
                        type="title"
                        placeholder="title" 
                        onChange={props.handleChange} 
                        onBlur={props.handleBlur} 
                      />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
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
