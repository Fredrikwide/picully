import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AuthRoute = (props) => {
	const { currentUser } = useAuth()

	return (
			currentUser
			? (<Route {...props} />)
			: (<Navigate to="/sign-in" />)
		)
}

export default AuthRoute
