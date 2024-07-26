import React, { useEffect, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { SelectMenu, Text } from '../atoms'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '@/app/api'
import {
  createStudentSchoolDataCall,
  updateStudentSchoolDataCall
} from '@/app/api/student'

interface UpdateSchoolDataFormValues {
  SchoolName: string
  SchoolGrade: string
  FavoriteSchoolSubject: string
  SchoolObservations: string
}

interface UpdateSchoolDataFormProps {
  studentId: string
  onSuccess?: () => void
}

export const UpdateSchoolDataForm: React.FC<UpdateSchoolDataFormProps> = ({
  studentId,
  onSuccess
}) => {
  const [initialValues, setInitialValues] =
    useState<UpdateSchoolDataFormValues>({
      SchoolName: '',
      SchoolGrade: '',
      FavoriteSchoolSubject: '',
      SchoolObservations: ''
    })
  const [schoolDataId, setSchoolDataId] = useState<string | null>(null)
  const toast = useToast()

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await api.get(`/student-school-data/${studentId}`)
        const schoolData = response.data?.[0]
        if (schoolData) {
          setSchoolDataId(schoolData.id)
          setInitialValues({
            SchoolName: schoolData.SchoolName,
            SchoolGrade: schoolData.SchoolGrade,
            FavoriteSchoolSubject: schoolData.FavoriteSchoolSubject,
            SchoolObservations: schoolData.SchoolObservations
          })
        }
      } catch (error) {
        console.error('Failed to fetch school data', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar os dados escolares. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchSchoolData()
  }, [studentId, toast])

  const formik = useFormik<UpdateSchoolDataFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      SchoolName: Yup.string().required('Nome da Escola é obrigatório'),
      SchoolGrade: Yup.string().required('Ano Escolar é obrigatório'),
      FavoriteSchoolSubject: Yup.string().required(
        'Matéria de preferência é obrigatória'
      ),
      SchoolObservations: Yup.string().required(
        'Observações escolares são obrigatórias'
      )
    }),
    onSubmit: async (values) => {
      try {
        if (schoolDataId) {
          await updateStudentSchoolDataCall(schoolDataId, values)
          toast({
            title: 'Dados escolares atualizados com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        } else {
          await createStudentSchoolDataCall({
            ...values,
            studentId
          })
          toast({
            title: 'Dados escolares criados com sucesso!',
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
          title: 'Erro ao salvar dados escolares',
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
    <form
      id="form-school-data"
      onSubmit={handleSubmit}
      style={{ width: '84%' }}
    >
      <Flex
        h={'380px'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
        p={'24px'}
        justifyContent={'space-between'}
        mt={'16px'}
        gap={'16px'}
      >
        <Flex w={'100%'} h={'7.27%'}>
          <Text.CardTitle>Dados Escolares</Text.CardTitle>
        </Flex>
        <Flex
          w={'100%'}
          h={'auto'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="SchoolName" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Nome da Escola
            </FormLabel>
            <Input
              type="text"
              name="SchoolName"
              value={values.SchoolName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.SchoolName && !!errors.SchoolName}
              placeholder="Nome da Escola"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl w={'28.87%'}>
            <SelectMenu
              name="SchoolGrade"
              value={values.SchoolGrade}
              selectedOption={values.SchoolGrade}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.SchoolGrade && !!errors.SchoolGrade}
              label="Ano Escolar"
              options={[
                '1 ano EF',
                '2 ano EF',
                '3 ano EF',
                '4 ano EF',
                '5 ano EF',
                '6 ano EF',
                '7 ano EF',
                '8 ano EF',
                '9 ano EF',
                '1 ano EM',
                '2 ano EM',
                '3 ano EM'
              ]}
            />
          </FormControl>
          <FormControl id="FavoriteSchoolSubject" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Matéria de preferência
            </FormLabel>
            <Input
              type="text"
              name="FavoriteSchoolSubject"
              value={values.FavoriteSchoolSubject}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.FavoriteSchoolSubject && !!errors.FavoriteSchoolSubject
              }
              placeholder="Matéria de preferência"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'auto'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="SchoolObservations" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Observações escolares
            </FormLabel>
            <Textarea
              minH={'150px'}
              maxH={'200px'}
              borderColor={'brand.gray30'}
              size={'md'}
              focusBorderColor="brand.primary"
              borderRadius="24px"
              name="SchoolObservations"
              value={values.SchoolObservations}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.SchoolObservations && !!errors.SchoolObservations
              }
              placeholder="Insira aqui observações escolares da criança."
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
}
