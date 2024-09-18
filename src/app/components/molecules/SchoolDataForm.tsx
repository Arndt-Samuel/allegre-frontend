import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Text as ChakraText
} from '@chakra-ui/react'
import React from 'react'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createStudentSchoolDataCall } from '@/app/api/student'
import { SelectMenuBase } from '../atoms'
import { Text } from '../atoms'

interface SchoolDataFormValues {
  SchoolName: string
  SchoolGrade: string
  FavoriteSchoolSubject: string
  SchoolObservations: string
  studentId: string
}

interface SchoolDataFormProps {
  studentId: string
  onSubmit: (values: SchoolDataFormValues) => Promise<void>
  savedData?: SchoolDataFormValues | null
}

export const SchoolDataForm: React.FC<SchoolDataFormProps> = ({
  studentId,
  onSubmit,
  savedData
}) => {
  const toast = useToast()

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue
  } = useFormik<SchoolDataFormValues>({
    initialValues: {
      SchoolName: savedData?.SchoolName || '',
      SchoolGrade: savedData?.SchoolGrade || '',
      FavoriteSchoolSubject: savedData?.FavoriteSchoolSubject || '',
      SchoolObservations: savedData?.SchoolObservations || '',
      studentId: studentId
    },
    validationSchema: Yup.object({
      SchoolName: Yup.string(),
      SchoolGrade: Yup.string(),
      FavoriteSchoolSubject: Yup.string(),
      SchoolObservations: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        await createStudentSchoolDataCall(values)
        onSubmit(values)
      } catch (error: any) {
        toast({
          title: 'Erro ao criar dados escolares',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const schoolGradeOptions = [
    { label: '1º ano EF', value: '1 ano EF' },
    { label: '2º ano EF', value: '2 ano EF' },
    { label: '3º ano EF', value: '3 ano EF' },
    { label: '4º ano EF', value: '4 ano EF' },
    { label: '5º ano EF', value: '5 ano EF' },
    { label: '6º ano EF', value: '6 ano EF' },
    { label: '7º ano EF', value: '7 ano EF' },
    { label: '8º ano EF', value: '8 ano EF' },
    { label: '9º ano EF', value: '9 ano EF' },
    { label: '1º ano EM', value: '1 ano EM' },
    { label: '2º ano EM', value: '2 ano EM' },
    { label: '3º ano EM', value: '3 ano EM' }
  ]

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
              touched={touched.SchoolName}
              error={errors.SchoolName}
              placeholder="Nome da Escola"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>

          <FormControl w={'28.87%'}>
            <SelectMenuBase
              name="SchoolGrade"
              label="Ano Escolar"
              options={schoolGradeOptions}
              value={values.SchoolGrade}
              onChange={(value) => setFieldValue('SchoolGrade', value)}
              onBlur={handleBlur}
              isInvalid={touched.SchoolGrade && !!errors.SchoolGrade}
            />
            {touched.SchoolGrade && errors.SchoolGrade ? (
              <ChakraText color="red.500" mt={2}>
                {errors.SchoolGrade}
              </ChakraText>
            ) : null}
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
              touched={touched.FavoriteSchoolSubject}
              error={errors.FavoriteSchoolSubject}
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
          <FormControl id="school-observations" w={['28.87%']}>
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
