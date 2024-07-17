import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import CheckBox from './Checkbox'
import Textarea from './Textarea'
import { SelectMenu } from '../atoms'
import React, { useState, forwardRef } from 'react'
import Input from './Input'
import { MaskToCurrency } from './MaskToCurrency'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CreateFamilyCall } from '@/app/api/student'
import { parse, isValid, format } from 'date-fns'

interface StatusFormValues {
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

interface StatusFormProps {
  studentId: string
  onSubmit: (values: StatusFormValues) => Promise<void>
}

export const StudentStatusForm = forwardRef<HTMLFormElement, StatusFormProps>(
  ({ studentId, onSubmit }, ref) => {
    const toast = useToast()
    const formik = useFormik<StatusFormValues>({
      initialValues: {
        name: '',
        dateOfBirth: '',
        degree_of_kinship: '',
        marital_status: '',
        wage: '0',
        retirement: '0',
        allowance: '0',
        other_income: '0',
        informal_work: false,
        familiar_observations: '',
        studentId: studentId
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Nome é obrigatório'),
        dateOfBirth: Yup.date().nullable(),
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
          const parsedDateOfBirth = values.dateOfBirth
            ? parse(values.dateOfBirth, 'yyyy-MM-dd', new Date())
            : null

          if (
            values.dateOfBirth &&
            parsedDateOfBirth &&
            !isValid(parsedDateOfBirth)
          ) {
            toast({
              title: 'Erro na data de nascimento',
              description: 'Data de nascimento inválida',
              status: 'error',
              duration: 9000,
              isClosable: true
            })
            return
          }

          const formattedDateOfBirth = parsedDateOfBirth
            ? format(parsedDateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
            : null

          const submissionValues = {
            ...values,
            dateOfBirth: formattedDateOfBirth
          }

          await CreateFamilyCall(submissionValues)
          onSubmit(submissionValues)
        } catch (error: any) {
          toast({
            title: 'Erro ao criar familiar',
            description: error.message || 'Ocorreu um erro, tente novamente.',
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
      setFieldValue,
      errors,
      touched
    } = formik

    const [currencyValues, setCurrencyValues] = useState({
      wage: '',
      retirement: '',
      allowance: '',
      other_income: ''
    })

    const handleCurrencyChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { name, value, selectionStart, selectionEnd } = event.target
      const nextState = { value, selectionStart, selectionEnd }
      const formattedState = MaskToCurrency({ nextState })
      setCurrencyValues((prev) => ({
        ...prev,
        [name]: formattedState.value
      }))
      setFieldValue(name as keyof StatusFormValues, formattedState.value)
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
                placeholder="Select Date and Time"
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
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.degree_of_kinship}
                error={errors.degree_of_kinship}
                label="Grau de parentesco"
                options={['Pai', 'Mãe', 'Tio/Tia', 'Avô/Avó']}
              />
            </FormControl>
            <FormControl w={'45%'}>
              <SelectMenu
                name="marital_status"
                value={values.marital_status}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.marital_status}
                error={errors.marital_status}
                label="Estado Civil"
                options={['Solteiro', 'Casado', 'Divorciado', 'Viuvo']}
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
                alignItems={'center'}
                justifyContent={'center'}
                value={currencyValues.wage}
                onChange={handleCurrencyChange}
                mask="9999999999"
                maskChar={null}
                placeholder="Insira a renda familiar"
                mt={'5px'}
                fontSize={'16px'}
                name="wage"
                onBlur={handleBlur}
                touched={touched.wage}
                error={errors.wage}
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
                alignItems={'center'}
                justifyContent={'center'}
                value={currencyValues.retirement}
                onChange={handleCurrencyChange}
                mask="9999999999"
                maskChar={null}
                placeholder="Insira a renda familiar"
                mt={'5px'}
                name="retirement"
                onBlur={handleBlur}
                touched={touched.retirement}
                error={errors.retirement}
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
                alignItems={'center'}
                justifyContent={'center'}
                value={currencyValues.allowance}
                onChange={handleCurrencyChange}
                mask="9999999999"
                maskChar={null}
                placeholder="Insira a renda familiar"
                mt={'5px'}
                fontSize={'16px'}
                name="allowance"
                onBlur={handleBlur}
                touched={touched.allowance}
                error={errors.allowance}
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
                alignItems={'center'}
                justifyContent={'center'}
                value={currencyValues.other_income}
                onChange={handleCurrencyChange}
                mask="9999999999"
                maskChar={null}
                placeholder="Insira a renda familiar"
                mt={'5px'}
                fontSize={'16px'}
                name="other_income"
                onBlur={handleBlur}
                touched={touched.other_income}
                error={errors.other_income}
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
            <CheckBox
              w={'45%'}
              name="informal_work"
              onChange={handleChange}
              onBlur={handleBlur}
              value={String(values.informal_work)}
              isInvalid={touched.informal_work && !!errors.informal_work}
            >
              Trabalho Informal
            </CheckBox>
            <Flex w={'45%'} />
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
                placeholder="Adicione aqui observações sobre o responsável"
                mt={'5px'}
                fontSize={'16px'}
              />
            </FormControl>
          </Flex>
        </Flex>
      </form>
    )
  }
)
