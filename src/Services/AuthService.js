import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const client = axios.create({
  baseURL: 'https://inv.runasp.net',
})

export function extractToken(data) {
  if (!data) return null
  if (typeof data === 'string') return data
  return (
    data.token ??
    data.Token ??
    data.accessToken ??
    data.AccessToken ??
    null
  )
}

export async function login({ email, password }) {
  const { data } = await client.post('/login', { email, password })
  const token = extractToken(data)
  if (!token) {
    throw new Error('El servidor no devolvió un token válido')
  }
  return token
}

export function decodeToken(token) {
  return jwtDecode(token)
}
