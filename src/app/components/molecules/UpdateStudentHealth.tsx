import React, { useEffect, useState } from 'react'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Input from './Input'
import { Text } from '../atoms'
import CheckBox from './Checkbox'
import Textarea from './Textarea'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createHealthCall, updateHealthCall } from '@/app/api/student'
import { api } from '@/app/api'

interface UpdateHealthFormValues {
  student_problem_health: boolean
  description_problem_health: string
  student_problem_allergies: boolean
  description_problem_allergies: string
  student_medication: boolean
  description_medication: string
  health_insurance: boolean
  insurance: string
}

interface HealthFormProps {
  studentId: string
  onSuccess?: () => void
}

export const UpdateStudentHealthForm: React.FC<HealthFormProps> = ({
  studentId,
  onSuccess
}) => {
  const [initialValues, setInitialValues] = useState<UpdateHealthFormValues>({
    student_problem_health: false,
    description_problem_health: '',
    student_problem_allergies: false,
    description_problem_allergies: '',
    student_medication: false,
    description_medication: '',
    health_insurance: false,
    insurance: ''
  })
  const [healthId, setHealthId] = useState<string | null>(null)
  const toast = useToast()

  const [isHealthIssueChecked, setIsHealthIssueChecked] = useState(false)
  const [isAllergyChecked, setIsAllergyChecked] = useState(false)
  const [isMedicationChecked, setIsMedicationChecked] = useState(false)
  const [isHealthInsuranceChecked, setIsHealthInsuranceChecked] =
    useState(false)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await api.get(`/student_health/${studentId}`)
        const health = response.data?.[0]
        if (health) {
          setHealthId(health.id)
          setInitialValues({
            student_problem_health: health.student_problem_health,
            description_problem_health: health.description_problem_health,
            student_problem_allergies: health.student_problem_allergies,
            description_problem_allergies: health.description_problem_allergies,
            student_medication: health.student_medication,
            description_medication: health.description_medication,
            health_insurance: health.health_insurance,
            insurance: health.insurance
          })
          setIsHealthIssueChecked(health.student_problem_health)
          setIsAllergyChecked(health.student_problem_allergies)
          setIsMedicationChecked(health.student_medication)
          setIsHealthInsuranceChecked(health.health_insurance)
        }
      } catch (error) {
        console.error('Failed to fetch health', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar a saúde do aluno. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchHealth()
  }, [studentId, toast])

  const formik = useFormik<UpdateHealthFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      student_problem_health: Yup.boolean().required(
        'Aluno possui algum problema de saúde é obrigatório'
      ),
      description_problem_health: Yup.string(),
      student_problem_allergies: Yup.boolean().required(
        'Aluno possui algum problema alérgico é obrigatório'
      ),
      description_problem_allergies: Yup.string(),
      student_medication: Yup.boolean().required(
        'Aluno faz uso de algum medicamento é obrigatório'
      ),
      description_medication: Yup.string(),
      health_insurance: Yup.boolean().required(
        'Aluno possui plano de saúde é obrigatório'
      ),
      insurance: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        if (healthId) {
          await updateHealthCall(healthId, values)
          toast({
            title: 'Saúde do aluno atualizada com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        } else {
          await createHealthCall({ ...values, studentId })
          toast({
            title: 'Saúde do aluno criada com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        }
        if (onSuccess) {
          onSuccess()
        }
      } catch (error: any) {
        toast({
          title: 'Erro ao salvar saúde do aluno',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    formik

  return (
    <form id="form-health" onSubmit={handleSubmit} style={{ width: '84%' }}>
      <Flex
        h={'auto'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
        p={'24px'}
        justifyContent={'space-between'}
        gap={'16px'}
      >
        <Flex w={'100%'} h={'5.6%'}>
          <Text.CardTitle>Saúde</Text.CardTitle>
        </Flex>
        <Flex
          w={'100%'}
          h={'28.3%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            name="student_problem_health"
            w={'25.74%'}
            onChange={(e) => {
              handleChange(e)
              setIsHealthIssueChecked(e.target.checked)
            }}
            onBlur={handleBlur}
            value={String(values.student_problem_health)}
            isChecked={values.student_problem_health}
            isInvalid={
              touched.student_problem_health && !!errors.student_problem_health
            }
          >
            Aluno possui algum problema de saúde?
          </CheckBox>
          <FormControl id="health-issue-description" w={['64.26%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Descreva o problema de saúde do aluno
            </FormLabel>
            <Textarea
              minH={'150px'}
              maxH={'230px'}
              placeholder="Insira aqui alguma observação sobre a saúde do aluno."
              mt={'5px'}
              fontSize={'16px'}
              name="description_problem_health"
              value={values.description_problem_health}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.description_problem_health &&
                !!errors.description_problem_health
              }
              disabled={!isHealthIssueChecked}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'28.3%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'25.74%'}
            name="student_problem_allergies"
            onChange={(e) => {
              handleChange(e)
              setIsAllergyChecked(e.target.checked)
            }}
            onBlur={handleBlur}
            value={String(values.student_problem_allergies)}
            isChecked={values.student_problem_allergies}
            isInvalid={
              touched.student_problem_allergies &&
              !!errors.student_problem_allergies
            }
          >
            Aluno possui algum problema alérgico?
          </CheckBox>
          <FormControl id="allergy-description" w={['64.26%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Descreva as alergias do aluno
            </FormLabel>
            <Textarea
              minH={'150px'}
              maxH={'230px'}
              placeholder="Insira aqui alguma observação sobre a alergia do aluno."
              mt={'5px'}
              fontSize={'16px'}
              name="description_problem_allergies"
              value={values.description_problem_allergies}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.description_problem_allergies &&
                !!errors.description_problem_allergies
              }
              disabled={!isAllergyChecked}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'28.3%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'25.74%'}
            name="student_medication"
            onChange={(e) => {
              handleChange(e)
              setIsMedicationChecked(e.target.checked)
            }}
            onBlur={handleBlur}
            value={String(values.student_medication)}
            isChecked={values.student_medication}
            isInvalid={
              touched.student_medication && !!errors.student_medication
            }
          >
            Aluno faz uso de algum medicamento?
          </CheckBox>
          <FormControl id="medication-description" w={['64.26%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Descreva os medicamentos usados pelo aluno
            </FormLabel>
            <Textarea
              minH={'150px'}
              maxH={'230px'}
              placeholder="Insira aqui alguma observação sobre os medicamentos usados pelo aluno."
              mt={'5px'}
              fontSize={'16px'}
              name="description_medication"
              value={values.description_medication}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.description_medication &&
                !!errors.description_medication
              }
              disabled={!isMedicationChecked}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'16.9%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <CheckBox
            w={'25.74%'}
            name="health_insurance"
            onChange={(e) => {
              handleChange(e)
              setIsHealthInsuranceChecked(e.target.checked)
            }}
            onBlur={handleBlur}
            value={String(values.health_insurance)}
            isChecked={values.health_insurance}
            isInvalid={touched.health_insurance && !!errors.health_insurance}
          >
            Aluno possui plano de saúde?
          </CheckBox>
          <FormControl id="health-insurance" w={['27.77%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Plano de saúde
            </FormLabel>
            <Input
              type="text"
              placeholder="Insira o plano de saúde do aluno"
              mt={'5px'}
              fontSize={'16px'}
              name="insurance"
              value={values.insurance}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.insurance && !!errors.insurance}
              disabled={!isHealthInsuranceChecked}
            />
          </FormControl>
          <Flex w={'26%'} />
        </Flex>
      </Flex>
    </form>
  )
}
