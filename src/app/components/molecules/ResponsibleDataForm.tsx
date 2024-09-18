import React, { useRef, useState, forwardRef } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  useToast,
  Text as ChakraText,
  Textarea
} from '@chakra-ui/react'
import {
  EducationLevelSelectMenu,
  EthnicitySelectMenu,
  SelectMenuBase,
  Text
} from '../atoms'
import { Input } from './Input'
import InputMask from 'react-input-mask'
import { PiFileArrowUpBold } from 'react-icons/pi'
import { Ethnicity, EducationLevel } from '@/app/enums/enums'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MaskToCurrency } from './MaskToCurrency'
import { createStudentResponsibleCall } from '@/app/api/student'

interface ResponsibleFormValues {
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

interface ResponsibleFormProps {
  studentId: string
  onSubmit: (values: ResponsibleFormValues) => Promise<void>
}

export const ResponsibleDataForm = forwardRef<
  HTMLFormElement,
  ResponsibleFormProps
>(({ studentId, onSubmit }, ref) => {
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const formik = useFormik<ResponsibleFormValues>({
    initialValues: {
      name: '',
      avatarUrl: '',
      rg: '',
      cpf: '',
      nis: '',
      degree_of_kinship: '',
      education_level: EducationLevel.NAO_ALFABETIZADA,
      current_job: '',
      wage: '',
      ethnicity: Ethnicity.BRANCO,
      primary_phone: '',
      responsible_observations: '',
      studentId: studentId
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nome completo é obrigatório'),
      avatarUrl: Yup.string().url('URL inválida').nullable(),
      rg: Yup.string().required('RG é obrigatório'),
      cpf: Yup.string().required('CPF é obrigatório'),
      nis: Yup.string().required('NIS é obrigatório'),
      degree_of_kinship: Yup.string(),
      education_level: Yup.mixed<EducationLevel>()
        .oneOf(Object.values(EducationLevel))
        .required('Gênero é obrigatório'),
      current_job: Yup.string().required('Trabalho atual é obrigatório'),
      wage: Yup.string(),
      ethnicity: Yup.mixed<Ethnicity>()
        .oneOf(Object.values(Ethnicity))
        .required('Etnia é obrigatória'),
      primary_phone: Yup.string(),
      responsible_observations: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        await createStudentResponsibleCall(values)
        onSubmit(values)
      } catch (error: any) {
        toast({
          title: 'Erro ao criar responsável',
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

  const [currencyValues, setCurrencyValues] = useState({
    wage: ''
  })

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, selectionStart, selectionEnd } = event.target
    const nextState = { value, selectionStart, selectionEnd }
    const formattedState = MaskToCurrency({ nextState })
    setCurrencyValues((prev) => ({
      ...prev,
      [name]: formattedState.value
    }))
    setFieldValue(name as keyof ResponsibleFormValues, formattedState.value)
  }

  const degreeOfKinshipOptions = [
    { label: 'Pai', value: 'Pai' },
    { label: 'Mãe', value: 'Mãe' },
    { label: 'Avô', value: 'Avô' },
    { label: 'Avó', value: 'Avó' },
    { label: 'Tio', value: 'Tio' },
    { label: 'Tia', value: 'Tia' },
    { label: 'Irmão', value: 'Irmão' },
    { label: 'Irmã', value: 'Irmã' },
    { label: 'Padrasto', value: 'Padrasto' },
    { label: 'Madrasta', value: 'Madrasta' },
    { label: 'Guardião Legal', value: 'Guardião Legal' }
  ]

  return (
    <form
      id="form-responsible"
      ref={ref}
      onSubmit={handleSubmit}
      style={{ width: '100%' }}
    >
      <Flex
        h={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
      >
        <Flex flexDir={'column'} h={'14.07%'}>
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
            w={'70%'}
            h={'13.31%'}
            borderRadius={'32px'}
            border={'1px dotted'}
            borderColor={'brand.gray30'}
            p={'24px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={handleClick}
            cursor={'pointer'}
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
                  para adicionar o arquivo.
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
        </Flex>
        <Flex
          w={'100%'}
          h={'7.43%'}
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
          <FormControl id={'CPF'} w={['45%']}>
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
              name="cpf"
              value={values.cpf}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.cpf}
              error={errors.cpf}
              placeholder="000.000.000-00"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={500}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'7.43%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'RG'} w={['45%']}>
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
              maskChar={null}
              mask="99.999-999"
              name="rg"
              value={values.rg}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.rg}
              error={errors.rg}
              placeholder="00.000-000"
              mt={'5px'}
              fontSize={'16px'}
              fontWeight={500}
            />
          </FormControl>
          <FormControl id={'NIS'} w={['45%']}>
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
              fontWeight={500}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'7.43%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="degree_of_kinship" w={['45%']}>
            <SelectMenuBase
              name="degree_of_kinship"
              label="Grau de parentesco"
              options={degreeOfKinshipOptions}
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
            <EducationLevelSelectMenu
              value={values.education_level}
              onChange={(value) => setFieldValue('education_level', value)}
              onBlur={handleBlur}
              isInvalid={touched.education_level && !!errors.education_level}
            />
            {touched.education_level && errors.education_level ? (
              <ChakraText color="red.500" mt={2}>
                {errors.education_level}
              </ChakraText>
            ) : null}
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'7.43%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id={'current_job'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Profissão
            </FormLabel>
            <Input
              type="text"
              name="current_job"
              value={values.current_job}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.current_job}
              error={errors.current_job}
              placeholder="Trabalho Atual"
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
        </Flex>
        <Flex
          w={'100%'}
          h={'7.43%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl w={'45%'}>
            <EthnicitySelectMenu
              value={values.ethnicity}
              onChange={(value) => setFieldValue('ethnicity', value)}
              onBlur={handleBlur}
              isInvalid={touched.ethnicity && !!errors.ethnicity}
            />
          </FormControl>
          <FormControl id={'primary-phone'} w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Telefone do Responsável primário
            </FormLabel>
            <Input
              as={InputMask}
              mask="+5\5 (99) 99999-9999"
              maskChar={null}
              type="text"
              name="primary_phone"
              value={values.primary_phone}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.primary_phone}
              error={errors.primary_phone}
              placeholder="(00) 00000-0000"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'97.57%'}
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
              name="responsible_observations"
              value={values.responsible_observations}
              onChange={handleChange}
              onBlur={handleBlur}
              minH={'100px'}
              maxH={'200px'}
              borderColor={'brand.gray30'}
              size={'md'}
              focusBorderColor="brand.primary"
              borderRadius="24px"
              placeholder="Adicione aqui observações sobre o responsável"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
        </Flex>
      </Flex>
    </form>
  )
})
