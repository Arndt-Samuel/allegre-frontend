import { api } from './api'
import {
  Gender,
  Ethnicity,
  HousingStatus,
  EducationLevel
} from '../enums/enums'

interface CreateStudentValues {
  name: string
  avatarUrl?: string
  rg?: string
  cpf?: string
  nis?: string
  gender: Gender
  ethnicity: Ethnicity
  dateOfBirth: string
  primary_phone: string
  secondary_phone: string
}

interface CreateStudentAdrressValues {
  address_street: string
  address_number: string
  address_complement: string
  address_neighborhood: string
  address_city: string
  address_state: string
  address_zip: string
  housingStatus: HousingStatus
  studentId: string
}

interface CreateStudentResponsibleValues {
  name: string
  avatarUrl: string
  rg: string
  cpf: string
  nis: string
  degree_of_kinship: string
  education_level: EducationLevel
  current_job: string
  wage: string
  ethnicity: Ethnicity
  primary_phone: string
  responsible_observations: string
  studentId: string
}

interface CreateStudentSchoolDataValues {
  SchoolName: string
  SchoolGrade: string
  FavoriteSchoolSubject: string
  SchoolObservations: string
  studentId: string
}

interface CreateWorkshopValues {
  date_of_entry: string
  date_of_exit: string | null
  studentIds: string[]
  classId: string
}

interface HealthValues {
  student_problem_health: boolean
  description_problem_health: string
  student_problem_allergies: boolean
  description_problem_allergies: string
  student_medication: boolean
  description_medication: string
  health_insurance: boolean
  insurance: string
  studentId: string
}

interface ComplementaryDataValues {
  clothingSize: string
  shoeSize: string
  favorite_soccer_team: string
  likeMoreInProject: string
  dream: string
  studentId: string
}

interface SocialServiceValues {
  receive_visit: boolean
  register_CRAS: boolean
  relative_in_prision: boolean
  family_at_institution_before: boolean
  project_name: string
  project_year: string
  family_scholarship: boolean
  accompanied_by_CREAS: boolean
  accompanied_by_CAPSAD: boolean
  accompanied_by_CAPSI: boolean
  studentId: string
}
interface StatusValues {
  name: string
  dateOfBirth: string | null
  degree_of_kinship: string
  marital_status: string
  wage: string
  retirement: string
  allowance: string
  other_income: string
  informal_work: boolean
  familiar_observations: string
  studentId: string
}

export const getStudents = async () => {
  try {
    const response = await api.get('/student')
    return response.data.data
  } catch (error) {
    throw new Error('Erro ao buscar alunos')
  }
}

export const createStudentCall = async (data: FormData) => {
  try {
    const response = await api.post('/student', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Erro ao criar estudante')
  }
}

export const createStudentAddressCall = async (
  data: CreateStudentAdrressValues
) => {
  const response = await api.post('/student-address', data)
  return response.data
}

export const createStudentResponsibleCall = async (
  data: CreateStudentResponsibleValues
) => {
  const response = await api.post('/student-responsible', data)
  return response.data
}

export const createStudentSchoolDataCall = async (
  data: CreateStudentSchoolDataValues
) => {
  const response = await api.post('/student-school-data', data)
  return response.data
}

export const getWorkshops = async () => {
  try {
    const response = await api.get('/class')
    return response.data.data.map((item: any) => ({
      id: item.id,
      name: item.name
    }))
  } catch (error) {
    throw new Error('Erro ao buscar oficinas')
  }
}

export const createWorkshopCall = async (data: CreateWorkshopValues) => {
  const response = await api.post('/student-classes', data)
  return response.data
}

export const createHealthCall = async (data: HealthValues) => {
  const response = await api.post('/student_health', data)
  return response.data
}

export const createComplementaryDataCall = async (
  data: ComplementaryDataValues
) => {
  const response = await api.post('/student-complementary-data', data)
  return response.data
}

export const createSocialServiceCall = async (data: SocialServiceValues) => {
  const response = await api.post('/student_social_service', data)
  return response.data
}

export const createFamilyCall = async (data: StatusValues) => {
  const response = await api.post('/student-family', data)
  return response.data
}

export const updateStudentCall = async (id: string, data: any) => {
  const response = await api.put(`/student/${id}`, data)
  return response.data
}

export const updateAddressCall = async (id: string, data: any) => {
  const response = await api.put(`/student-address/${id}`, data)
  return response.data
}

export const updateStudentSchoolDataCall = async (id: string, data: any) => {
  const response = await api.put(`/student-school-data/${id}`, data)
  return response.data
}

export const updateHealthCall = async (id: string, data: any) => {
  const response = await api.put(`/student_health/${id}`, data)
  return response.data
}

export const updateComplementaryDataCall = async (id: string, data: any) => {
  const response = await api.put(`/student-complementary-data/${id}`, data)
  return response.data
}

export const updateSocialServiceCall = async (id: string, data: any) => {
  const response = await api.put(`/student_social_service/${id}`, data)
  return response.data
}

export const updateStudentResponsibleCall = async (id: string, data: any) => {
  const response = await api.put(`/student-responsible/${id}`, data)
  return response.data
}

export const updateFamilyCall = async (id: string, data: any) => {
  const response = await api.put(`/student-family/${id}`, data)
  return response.data
}

export const deleteStudentResponsibleCall = async (responsibleId: string) => {
  const response = await api.delete(`/student-responsible/${responsibleId}`)
  return response.data
}

export const deleteStudentFamilyCall = async (id: string) => {
  const response = await api.delete(`/student-family/${id}`)
  return response.data
}

export const deleteStudentCall = async (id: string) => {
  const response = await api.delete(`/student/${id}`)
  return response.data
}
