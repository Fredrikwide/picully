import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUpdate } from '../contexts/UpdateContext';
import SharedImageGrid from './pictureItems/SharedImageGrid';

const AuthRoute = (props) => {
    const { currentUser } = useAuth();
    const { albumToShare, renderShared } = useUpdate();
    return (
        <>
          {currentUser ? 
          (<Route {...props}/>)
          : 
          (<Navigate to="/"/>)
          }
        </>
    )
}

export default AuthRoute