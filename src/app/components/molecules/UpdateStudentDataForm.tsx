import React, { useEffect, useRef, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Text as ChakraText,
  useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PiFileArrowUpBold } from 'react-icons/pi'
import Input from './Input'
import InputMask from 'react-input-mask'
import { SelectMenu, Text } from '../atoms'
import { Gender, Ethnicity } from '@/app/enums/enums'
import { format, isValid, parse, parseISO } from 'date-fns'
import { api } from '@/app/api'
import { updateStudentCall } from '@/app/api/student'

interface UpdateStudentFormValues {
  name: string
  avatarUrl?: string
  rg: string
  cpf: string
  nis: string
  gender: Gender
  ethnicity: Ethnicity
  dateOfBirth: string
  primary_phone: string
  secondary_phone: string
}

interface UpdateStudentDataFormProps {
  studentId: string
  onSuccess?: () => void
}

export const UpdateStudentDataForm: React.FC<UpdateStudentDataFormProps> = ({
  studentId,
  onSuccess
}) => {
  const [initialValues, setInitialValues] = useState<UpdateStudentFormValues>({
    name: '',
    avatarUrl: '',
    rg: '',
    cpf: '',
    nis: '',
    gender: Gender.MALE,
    ethnicity: Ethnicity.BRANCO,
    dateOfBirth: '',
    primary_phone: '',
    secondary_phone: ''
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const toast = useToast()

  const formatDateToInput = (dateString: string | null) => {
    if (!dateString) return ''
    const parsedDate = parseISO(dateString)
    return format(parsedDate, 'yyyy-MM-dd')
  }

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`/student?id=${studentId}`)
        const studentData = response.data.data[0]
        setInitialValues({
          name: studentData.name,
          avatarUrl: studentData.avatarUrl || '',
          rg: studentData.rg,
          cpf: studentData.cpf,
          nis: studentData.nis,
          gender: studentData.gender,
          ethnicity: studentData.ethnicity,
          dateOfBirth: formatDateToInput(studentData.dateOfBirth),
          primary_phone: studentData.primary_phone,
          secondary_phone: studentData.secondary_phone
        })
      } catch (error) {
        console.error('Failed to fetch student data', error)
      }
    }
    fetchStudentData()
  }, [studentId])

  const formik = useFormik<UpdateStudentFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Nome completo é obrigatório'),
      avatarUrl: Yup.string().url('URL inválida').nullable(),
      rg: Yup.string().required('RG é obrigatório'),
      cpf: Yup.string().required('CPF é obrigatório'),
      nis: Yup.string().required('NIS é obrigatório'),
      gender: Yup.mixed<Gender>()
        .oneOf(Object.values(Gender))
        .required('Gênero é obrigatório'),
      ethnicity: Yup.mixed<Ethnicity>()
        .oneOf(Object.values(Ethnicity))
        .required('Etnia é obrigatória'),
      dateOfBirth: Yup.string()
        .required('Data de nascimento é obrigatória')
        .test('is-valid-date', 'Data de nascimento inválida', (value) => {
          const parsedDate = parse(value ?? '', 'yyyy-MM-dd', new Date())
          return isValid(parsedDate)
        }),
      primary_phone: Yup.string(),
      secondary_phone: Yup.string()
    }),
    onSubmit: async (values) => {
      const parsedDate = parse(values.dateOfBirth, 'yyyy-MM-dd', new Date())
      if (!isValid(parsedDate)) {
        toast({
          title: 'Erro na data de nascimento',
          description: 'Data de nascimento inválida',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        return
      }
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
      const submissionValues = {
        ...values,
        dateOfBirth: formattedDate
      }
      try {
        await updateStudentCall(studentId, submissionValues)
        toast({
          title: 'Estudante atualizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        if (onSuccess) {
          onSuccess()
        }
      } catch (error) {
        let errorMessage = 'Erro ao atualizar estudante!'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        toast({
          title: 'Erro ao atualizar estudante',
          description: errorMessage,
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setFieldValue('avatarUrl', fileUrl)
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <form id="form-0" onSubmit={handleSubmit} style={{ width: '84%' }}>
      <Flex
        h={'578px'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
        p={'24px'}
        justifyContent={'space-between'}
        gap={'16px'}
      >
        <Flex w={'100%'} h={'5.54%'}>
          <Text.CardTitle>Dados do Aluno</Text.CardTitle>
        </Flex>
        <Flex flexDir={'column'} h={'36.86%'}>
          <Text
            fontSize={'14px'}
            fontWeight={'700'}
            letterSpacing={'-1px'}
            lineHeight={'20px'}
            mb={'5px'}
            color={'brand.gray60'}
          >
            Foto 3x4
          </Text>
          <Flex
            w={'40%'}
            h={'186px'}
            borderRadius={'32px'}
            border={'1px dotted'}
            borderColor={'brand.gray30'}
            p={'24px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={handleClick}
            cursor="pointer"
          >
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Flex
              w={'100%'}
              h={'100%'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              cursor={'pointer'}
            >
              <Flex
                w={'64px'}
                h={'64px'}
                borderRadius={'132px'}
                bg={'brand.purple20'}
                color={'brand.primary'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon as={PiFileArrowUpBold} w={'32px'} h={'32px'} />
              </Flex>
              <Flex flexDir={'row'} mt={'20px'}>
                <ChakraText
                  mr={'3px'}
                  fontSize={'14px'}
                  fontWeight={'700'}
                  lineHeight={'20px'}
                  color={'brand.primary'}
                >
                  Clique aqui
                </ChakraText>
                <ChakraText
                  fontSize={'14px'}
                  fontWeight={'700'}
                  lineHeight={'20px'}
                  color={'brand.gray60'}
                >
                  para adicionar o arquivo ou arraste até o campo.
                </ChakraText>
              </Flex>
              <ChakraText
                fontSize={'14px'}
                fontWeight={'500'}
                lineHeight={'20px'}
                color={'brand.gray40'}
              >
                Formatos suportados: PNG, JPG.
              </ChakraText>
            </Flex>
          </Flex>
          {touched.avatarUrl && errors.avatarUrl && (
            <ChakraText color="red" mt="2">
              {errors.avatarUrl}
            </ChakraText>
          )}
        </Flex>
        <Flex
          w={'100%'}
          h={'13.15%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="name" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Nome Completo
            </FormLabel>
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
              placeholder="Nome Completo"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>
          <FormControl id="RG" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              RG
            </FormLabel>
            <Input
              as={InputMask}
              mask="99.999-999"
              maskChar={null}
              id="rg"
              name="rg"
              value={values.rg}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.rg}
              error={errors.rg}
              placeholder="00.000-000"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>
          <FormControl id="CPF" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              CPF
            </FormLabel>
            <Input
              as={InputMask}
              mask="999.999.999-99"
              maskChar={null}
              id="cpf"
              name="cpf"
              value={values.cpf}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.cpf}
              error={errors.cpf}
              placeholder="000.000.000-00"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'13.15%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="NIS" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              NIS
            </FormLabel>
            <Input
              as={InputMask}
              mask="999.99999.99-9"
              maskChar={null}
              name="nis"
              value={values.nis}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.nis}
              error={errors.nis}
              placeholder="000.00000.00-0"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>
          <FormControl w={'28.87%'}>
            <SelectMenu
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.gender && !!errors.gender}
              label="Gênero"
              options={Object.values(Gender).map((g) => ({
                label: g,
                value: g
              }))}
              selectedOption={values.gender}
            />
          </FormControl>
          <FormControl w={'28.87%'}>
            <SelectMenu
              name="ethnicity"
              value={values.ethnicity}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.ethnicity && !!errors.ethnicity}
              label="Etnia"
              options={Object.values(Ethnicity).map((e) => ({
                label: e,
                value: e
              }))}
              selectedOption={values.ethnicity}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'13.15%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="dateOfBirth" w={['28.87%']}>
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
              type="date"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.dateOfBirth}
              error={errors.dateOfBirth}
              placeholder="DD/MM/YYYY"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>

          <FormControl id="primary-phone" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Telefone Primário
            </FormLabel>
            <Input
              as={InputMask}
              mask="+5\5 (99) 99999-9999"
              maskChar={null}
              id="primary-phone"
              name="primary_phone"
              value={values.primary_phone}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.primary_phone}
              error={errors.primary_phone}
              placeholder="(00) 00000-0000"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={'500'}
            />
          </FormControl>
          <FormControl id="secondary-phone" w={['28.87%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Telefone Secundário
            </FormLabel>
            <Input
              as={InputMask}
              mask="+5\5 (99) 99999-9999"
              maskChar={null}
              id="secondary-phone"
              name="secondary_phone"
              value={values.secondary_phone}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.secondary_phone}
              error={errors.secondary_phone}
              placeholder="(00) 00000-0000"
              mt={'5px'}
              fontSize={'16px'}
              size={'md'}
              fontWeight={'500'}
            />
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
}
