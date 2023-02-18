import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

export default function PrivateRoute() {
  const { loggedIn } = useAuth();
  return (
    <>
        {loggedIn ? <Outlet/> : <Navigate to="/" />}
    </>
  )
}