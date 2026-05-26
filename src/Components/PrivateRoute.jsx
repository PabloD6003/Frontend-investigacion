import { useContext } from 'react'
import { Navigate } from '@tanstack/react-router'
import { AuthContext } from '../Context/AuthContext'

function hasAdminRole(user) {
  if (!user) return false

  const role =
    user.role ??
    user.Role ??
    user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  if (Array.isArray(role)) {
    return role.includes('admin')
  }

  return role === 'admin'
}

export default function PrivateRoute({ children }) {
  const { user, isAuthReady } = useContext(AuthContext)

  if (!isAuthReady) {
    return <p className="text-center text-gray-500">Cargando...</p>
  }

  if (!user || !hasAdminRole(user)) {
    return <Navigate to="/login" replace />
  }

  return children
}
