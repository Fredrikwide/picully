import { Flex, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Button } from "react-scroll";
import { useAuth } from "../../contexts/AuthContext";
import { FirebaseContext } from "../../contexts/FirebaseContext";

 const CreateAlbum = () => {
  const [albumName, setAlbumName] = useState("");
  const {firebaseFunctions} = useContext(FirebaseContext)
  const {currentUser} = useAuth()

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const onAlbumCreate = async () => {
    if (!albumName && !currentUser) {
      return;
    }
    await firebaseFunctions.createAlbum(albumName, currentUser.uid)
    setAlbumName("");
  };

  return (
    <Flex justify="center" align="center" bg="black">
      <input value={albumName} onChange={onAlbumNameChange} type="text" placeholder="album name" />
      <Button onClick={onAlbumCreate}>Create album</Button>
    </Flex>
  );
};

export default CreateAlbum