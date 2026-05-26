import { useContext } from 'react'
import { Link, Navigate } from '@tanstack/react-router'
import Welcome from '../Components/Welcome'
import { AuthContext } from '../Context/AuthContext.jsx'

const HomePage = () => {
  const { user, isAuthReady } = useContext(AuthContext)

  if (!isAuthReady) {
    return <p className="text-center text-gray-500">Cargando...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="text-center">
      <Welcome userName={user?.email ?? user?.unique_name} />
      <Link
        to="/admin"
        className="inline-block mt-6 py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        Ir al panel de administración
      </Link>
    </div>
  )
}

export default HomePage
