import { useContext } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AuthContext } from '../Context/AuthContext'

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const userName = user?.email ?? user?.unique_name ?? 'Administrador'

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Panel de administración
      </h1>
      <p className="text-gray-600 mb-6">
        Bienvenido, <span className="font-semibold text-blue-600">{userName}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Tenés acceso completo como administrador.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
