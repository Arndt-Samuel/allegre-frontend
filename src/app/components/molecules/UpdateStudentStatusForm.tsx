import {
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Textarea,
  Checkbox,
  Text as ChakraText
} from '@chakra-ui/react'
import React, { useState, forwardRef, useEffect } from 'react'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateFamilyCall } from '@/app/api/student'
import { format, parseISO } from 'date-fns'
import { api } from '@/app/api'
import { MaskToCurrency } from './MaskToCurrency'
import { DegreeOfKinshipSelectMenu, MaritalStatusSelectMenu } from '../atoms'

interface UpdateStatusFormValues {
  id: string
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
}

interface StatusFormProps {
  studentId: string
  relativeId: string
  onSuccess?: () => void
}

export const UpdateStudentStatusForm = forwardRef<
  HTMLFormElement,
  StatusFormProps
>(({ studentId, onSuccess, relativeId }, ref) => {
  const [initialValues, setInitialValues] = useState<UpdateStatusFormValues>({
    id: '',
    name: '',
    dateOfBirth: '',
    degree_of_kinship: '',
    marital_status: '',
    wage: '0,00',
    retirement: '0,00',
    allowance: '0,00',
    other_income: '0,00',
    informal_work: false,
    familiar_observations: ''
  })
  const [currencyValues, setCurrencyValues] = useState({
    wage: '',
    retirement: '',
    allowance: '',
    other_income: ''
  })
  const toast = useToast()

  useEffect(() => {
    const fetchRelative = async () => {
      try {
        const response = await api.get(`/student-family/${studentId}`)
        const relative = response.data.find(
          (r: UpdateStatusFormValues) => r.id === relativeId
        )
        if (relative) {
          setInitialValues({
            id: relative.id,
            name: relative.name,
            dateOfBirth: relative.dateOfBirth
              ? format(parseISO(relative.dateOfBirth), 'yyyy-MM-dd')
              : '',
            degree_of_kinship: relative.degree_of_kinship,
            marital_status: relative.marital_status,
            wage: relative.wage,
            retirement: relative.retirement,
            allowance: relative.allowance,
            other_income: relative.other_income,
            informal_work: relative.informal_work,
            familiar_observations: relative.familiar_observations
          })
          setCurrencyValues({
            wage: relative.wage,
            retirement: relative.retirement,
            allowance: relative.allowance,
            other_income: relative.other_income
          })
        }
      } catch (error) {
        console.error('Failed to fetch relative', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar o familiar. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchRelative()
  }, [studentId, relativeId, toast])

  const formik = useFormik<UpdateStatusFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Nome é obrigatório'),
      dateOfBirth: Yup.date()
        .nullable()
        .required('Data de nascimento é obrigatória'),
      degree_of_kinship: Yup.string(),
      marital_status: Yup.string(),
      wage: Yup.string(),
      retirement: Yup.string(),
      allowance: Yup.string(),
      other_income: Yup.string(),
      informal_work: Yup.boolean(),
      familiar_observations: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        const submissionValues = {
          ...values,
          dateOfBirth: values.dateOfBirth
            ? format(
                parseISO(values.dateOfBirth),
                "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
              )
            : null
        }
        await updateFamilyCall(relativeId, submissionValues)
        toast({
          title: 'Familiar atualizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        if (onSuccess) {
          onSuccess()
        }
      } catch (error: any) {
        toast({
          title: 'Erro ao atualizar familiar',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue
  } = formik

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, selectionStart, selectionEnd } = event.target
    const nextState = { value, selectionStart, selectionEnd }
    const formattedState = MaskToCurrency({ nextState })
    setCurrencyValues((prev) => ({
      ...prev,
      [name]: formattedState.value
    }))
    setFieldValue(name as keyof UpdateStatusFormValues, formattedState.value)
  }

  return (
    <form
      id="form-family-frame"
      ref={ref}
      onSubmit={handleSubmit}
      style={{ width: '100%' }}
    >
      <Flex
        w={'100%'}
        h={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
      >
        <Flex
          w={'100%'}
          h={'9.95%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'name'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Nome completo
            </FormLabel>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
              placeholder="Nome Completo"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id={'dateOfBirth'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Data de Nascimento
            </FormLabel>
            <Input
              name="dateOfBirth"
              type="date"
              value={values.dateOfBirth || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.dateOfBirth}
              error={errors.dateOfBirth}
              placeholder="DD/MM/YYYY"
              size="md"
            />
          </FormControl>
        </Flex>

        <Flex
          w={'100%'}
          h={'9.95%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl w={'45%'}>
            <DegreeOfKinshipSelectMenu
              value={values.degree_of_kinship}
              onChange={(value) => setFieldValue('degree_of_kinship', value)}
              onBlur={handleBlur}
              isInvalid={
                touched.degree_of_kinship && !!errors.degree_of_kinship
              }
            />
            {touched.degree_of_kinship && errors.degree_of_kinship ? (
              <ChakraText color="red.500" mt={2}>
                {errors.degree_of_kinship}
              </ChakraText>
            ) : null}
          </FormControl>
          <FormControl w={'45%'}>
            <MaritalStatusSelectMenu
              value={values.marital_status}
              onChange={(value) => setFieldValue('marital_status', value)}
              onBlur={handleBlur}
              isInvalid={touched.marital_status && !!errors.marital_status}
            />
            {touched.marital_status && errors.marital_status ? (
              <ChakraText color="red.500" mt={2}>
                {errors.marital_status}
              </ChakraText>
            ) : null}
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'9.95%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="family-income" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Salário
            </FormLabel>
            <Input
              name="wage"
              value={currencyValues.wage}
              onChange={handleCurrencyChange}
              onBlur={handleBlur}
              touched={touched.wage}
              error={errors.wage}
              placeholder="Insira a renda familiar"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="family-income" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Aposentadoria
            </FormLabel>
            <Input
              name="retirement"
              value={currencyValues.retirement}
              onChange={handleCurrencyChange}
              onBlur={handleBlur}
              touched={touched.retirement}
              error={errors.retirement}
              placeholder="Insira a renda familiar"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>

        <Flex
          w={'100%'}
          h={'9.95%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="family-income" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Pensão
            </FormLabel>
            <Input
              name="allowance"
              value={currencyValues.allowance}
              onChange={handleCurrencyChange}
              onBlur={handleBlur}
              touched={touched.allowance}
              error={errors.allowance}
              placeholder="Insira a renda familiar"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="family-income" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Outras rendas
            </FormLabel>
            <Input
              name="other_income"
              value={currencyValues.other_income}
              onChange={handleCurrencyChange}
              onBlur={handleBlur}
              touched={touched.other_income}
              error={errors.other_income}
              placeholder="Insira a renda familiar"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'6.02%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Checkbox
            name="informal_work"
            onChange={handleChange}
            onBlur={handleBlur}
            value={String(values.informal_work)}
            isChecked={values.informal_work}
            colorScheme="purple"
          >
            Trabalho Informal
          </Checkbox>
        </Flex>
        <Flex
          w={'100%'}
          h={'15.71%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={'25px'}
        >
          <FormControl id="school-observations" w={['100%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Observações
            </FormLabel>
            <Textarea
              minH={'150px'}
              maxH={'200px'}
              borderColor={'brand.gray30'}
              size={'md'}
              focusBorderColor="brand.primary"
              borderRadius="24px"
              name="familiar_observations"
              value={values.familiar_observations}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Adicione aqui observações sobre o familiar"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
})
