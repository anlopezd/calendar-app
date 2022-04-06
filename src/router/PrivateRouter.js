import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ children, autenticado }) => {
  return autenticado ? children : <Navigate to="/login" />
}

export default PrivateRouter