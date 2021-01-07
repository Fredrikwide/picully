import React, { useState, createContext } from 'react'

export const UpdateContext = createContext();


export const UpdateProvider = props => {
    const [signUpIsClicked, setSignUpIsClicked] = useState(false)


    const updateContextValue = {

      signUpIsClicked,
      setSignUpIsClicked,      
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