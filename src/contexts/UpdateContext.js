import React, { useState, createContext, useContext } from 'react'

export const UpdateContext = createContext();


export const useUpdate = () => useContext(UpdateContext)
  

export const UpdateProvider = props => {
    
    const [signUpIsClicked, setSignUpIsClicked] = useState(false)
    const [currentAlbumID, setCurrentAlbumID] = useState("")

    const updateContextValue = {
        
      signUpIsClicked,
      setSignUpIsClicked,
      currentAlbumID,
      setCurrentAlbumID 
    }

    return (
        <UpdateContext.Provider
            value=
            {updateContextValue}
        >
            {props.children}
        </UpdateContext.Provider>
    )
}