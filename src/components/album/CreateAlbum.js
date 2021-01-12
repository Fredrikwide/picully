import { Box, Flex} from "@chakra-ui/react";
import CreateAlbumForm from "../forms/CreateAlbumForm";
import Albums from "./Albums";

 const CreateAlbum = () => {
 
  return (
    <>
    <Box w="100%" h="100%" mb="10rem" mt="10rem">
      <Albums />
    </Box>
    <Flex justify="center" align="center" bg="teal.600" direction="column">  
      <CreateAlbumForm />
    </Flex>
    </>
  );
};

export default CreateAlbum