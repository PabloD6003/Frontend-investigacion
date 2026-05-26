import { createContext, useState, useEffect } from 'react'
import { client, decodeToken } from '../Services/AuthService'
import { useLogin } from '../Hooks/useLogin'

export const AuthContext = createContext()

const AUTH_TOKEN_KEY = 'authToken'

function rehydrateFromToken(storedToken, setToken, setUser) {
  client.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
  setToken(storedToken)
  setUser(decodeToken(storedToken))
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const loginMutation = useLogin()

  const login = async ({ email, password }) => {
    setLoginLoading(true)
    setLoginError(false)
    loginMutation.reset()

    try {
      const newToken = await loginMutation.mutateAsync({ email, password })

      if (!newToken || typeof newToken !== 'string') {
        throw new Error('Token inválido recibido del servidor')
      }

      const decodedUser = decodeToken(newToken)
      localStorage.setItem(AUTH_TOKEN_KEY, newToken)
      client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      setToken(newToken)
      setUser(decodedUser)
    } catch (error) {
      console.error(error)
      setLoginError(true)
      throw error
    } finally {
      setLoginLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    delete client.defaults.headers.common['Authorization']
    setUser(null)
    setToken(null)
    setLoginError(false)
    loginMutation.reset()
  }

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!storedToken) {
      setIsAuthReady(true)
      return
    }

    try {
      rehydrateFromToken(storedToken, setToken, setUser)
    } catch (error) {
      console.error('Token almacenado inválido:', error)
      localStorage.removeItem(AUTH_TOKEN_KEY)
      delete client.defaults.headers.common['Authorization']
    } finally {
      setIsAuthReady(true)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthReady,
        login,
        logout,
        loginLoading,
        loginError: loginError || loginMutation.isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
