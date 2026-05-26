import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../Services/AuthService'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      queryClient.setQueryData(['authToken'], token)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
