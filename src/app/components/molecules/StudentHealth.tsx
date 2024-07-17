import React, { useState } from 'react'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Input from './Input'
import { Text } from '../atoms'
import CheckBox from './Checkbox'
import Textarea from './Textarea'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CreateHealthCall } from '@/app/api/student'

interface HealthFormValues {
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

interface HealthFormProps {
  studentId: string
  onSubmit: (values: HealthFormValues) => Promise<void>
  savedData?: HealthFormValues | null
}

export const StudentHealthForm: React.FC<HealthFormProps> = ({
  studentId,
  onSubmit,
  savedData
}) => {
  const toast = useToast()

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<HealthFormValues>({
      initialValues: {
        student_problem_health: savedData?.student_problem_health || false,
        description_problem_health: savedData?.description_problem_health || '',
        student_problem_allergies:
          savedData?.student_problem_allergies || false,
        description_problem_allergies:
          savedData?.description_problem_allergies || '',
        student_medication: savedData?.student_medication || false,
        description_medication: savedData?.description_medication || '',
        health_insurance: savedData?.health_insurance || false,
        insurance: savedData?.insurance || '',
        studentId: studentId
      },
      validationSchema: Yup.object({
        student_problem_health: Yup.boolean().required(
          'Aluno possui algum problema de saúde é obrigatório'
        ),
        description_problem_health: Yup.string(),
        student_problem_allergies: Yup.boolean().required(
          'Aluno possui algum problema alergia é obrigatório'
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
          await CreateHealthCall(values)
          onSubmit(values)
        } catch (error: any) {
          toast({
            title: 'Erro ao criar saúde',
            description: error.message || 'Ocorreu um erro, tente novamente.',
            status: 'error',
            duration: 9000,
            isClosable: true
          })
        }
      }
    })

  const [isHealthIssueChecked, setIsHealthIssueChecked] = useState(
    values.student_problem_health
  )
  const [isAllergyChecked, setIsAllergyChecked] = useState(
    values.student_problem_allergies
  )
  const [isMedicationChecked, setIsMedicationChecked] = useState(
    values.student_medication
  )
  const [isHealthInsuranceChecked, setIsHealthInsuranceChecked] = useState(
    values.health_insurance
  )

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
            isInvalid={
              touched.student_problem_allergies &&
              !!errors.student_problem_allergies
            }
          >
            Aluno possui algum problema alergico?
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
