import {
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Textarea,
  Checkbox
} from '@chakra-ui/react'
import React, { useState, forwardRef, useEffect } from 'react'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateFamilyCall } from '@/app/api/student'
import { format, parseISO } from 'date-fns'
import { api } from '@/app/api'
import { MaskToCurrency } from './MaskToCurrency'
import { SelectMenu } from '../atoms'

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
            <SelectMenu
              name="degree_of_kinship"
              value={values.degree_of_kinship}
              selectedOption={values.degree_of_kinship}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.degree_of_kinship}
              error={errors.degree_of_kinship}
              label="Grau de parentesco"
              options={[
                'Pai',
                'Mãe',
                'Avô',
                'Avó',
                'Tio',
                'Tia',
                'Irmão',
                'Irmã',
                'Primo',
                'Prima',
                'Padrasto',
                'Madrasta',
                'Guardião Legal',
                'Outro'
              ]}
            />
          </FormControl>
          <FormControl w={'45%'}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Estado Civil
            </FormLabel>
            <Input
              name="marital_status"
              value={values.marital_status}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.marital_status}
              error={errors.marital_status}
              placeholder="Estado Civil"
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
