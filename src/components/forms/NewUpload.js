
/* eslint-disable no-unused-vars */
import { Flex, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React from 'react'
import { useForm } from "react-hook-form";
import { useFire } from '../../contexts/FirebaseContext';
const NewUpload = () => {
  const { register, handleSubmit } = useForm() 
  const {storage} = useFire()
  const onSubmit = (data) => {
    const storageRef = storage.ref()
  }

  return (
    <form>
      <Flex justify="center" align="center">
        <InputGroup display="flex" justifyContent="center" alignItems="center" mt="10rem">
          <Input ref={register} name="picture" pt="5px"type="file" multiple w="400px" textAlign="center" />
          <InputRightAddon bg="teal.400" color="white" cursor="pointer" onClick={onSubmit} _hover={{backgroundColor: "teal.200", color: "white"}}>
              Submit
          </InputRightAddon>
        </InputGroup> 
      </Flex>
    </form>
  );
}


export default NewUpload
