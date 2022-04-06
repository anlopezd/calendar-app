import React from 'react'
import { Navigate } from "react-router-dom"

const PublicRouter = ({ children, autenticado }) => {
  return !autenticado ? children : <Navigate to="/home" />
}

export default PublicRouter