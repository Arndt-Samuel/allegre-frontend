import { Status } from '../enums/enums'
import { api } from './api'

export const createUserCall = async (data: FormData) => {
  try {
    const response = await api.post('/user', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw new Error('Erro ao criar usuário')
  }
}

export const updateUserStatus = async (id: string, status: Status) => {
  try {
    const response = await api.put(`/user/${id}/status`, { status })
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar o status do usuário:', error)
    throw error
  }
}
