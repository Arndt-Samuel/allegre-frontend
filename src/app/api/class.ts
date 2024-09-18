import { api } from './api'

interface CreateClassValues {
  name: string
  logoUrl?: string | null
  place?: string
  daysOfClasses?: string
  startTime?: string
  endTime?: string
  classObservations?: string
  userId?: string
}

interface UpdateClassValues {
  name: string
  logoUrl?: string | null
  place?: string
  daysOfClasses?: string
  startTime?: string
  endTime?: string
  classObservations?: string
  userId?: string
}

export interface AttendanceClassFormValues {
  classId: string
  photoUrl: string | File | null
  students: { studentId: string; isPresent: boolean; observations?: string }[]
}

export interface UpdateAttendanceClassFormValues {
  classAttendanceId: string
  dateOfClass: string
  photoUrl: string | File | null
  students: { studentId: string; isPresent: boolean; observations?: string }[]
}

interface CreateStudentsClassValues {
  date_of_entry: string
  date_of_exit: string | null
  studentIds: string[]
  classId: string
}

export const createClassCall = async (data: CreateClassValues | FormData) => {
  try {
    const response = await api.post('/class', data, {
      headers: {
        'Content-Type':
          data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Erro ao criar classe')
  }
}

export const updateClassCall = async (
  id: string,
  data: UpdateClassValues | FormData
) => {
  try {
    const response = await api.put(`/class/${id}`, data, {
      headers: {
        'Content-Type':
          data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Erro ao atualizar classe')
  }
}

export const createAttendance = async (data: FormData): Promise<any> => {
  try {
    const response = await api.post('/class-attendance', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error('Erro ao salvar a lista de presença:', error)
    throw error
  }
}

export const updateAttendance = async (
  id: string,
  data: FormData
): Promise<any> => {
  try {
    const response = await api.put(`/class-attendance/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error('Erro ao salvar a lista de presença:', error)
    throw error
  }
}

export const createStudentsClassCall = async (
  data: CreateStudentsClassValues
) => {
  const response = await api.post('/student-classes', data)
  return response.data
}
