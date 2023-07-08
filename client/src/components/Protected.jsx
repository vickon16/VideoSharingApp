import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
  const {user} = useSelector(state => state.user);

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default Protected