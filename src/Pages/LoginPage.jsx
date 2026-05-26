import { useContext } from 'react'
import { Navigate } from '@tanstack/react-router'
import Login from '../Components/Login'
import { AuthContext } from '../Context/AuthContext'

const LoginPage = () => {
  const { user, isAuthReady } = useContext(AuthContext)

  if (!isAuthReady) {
    return <p className="text-center text-gray-500">Cargando...</p>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Login />
}

export default LoginPage
