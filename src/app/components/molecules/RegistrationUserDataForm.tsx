import React, { useRef, useState, useEffect } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Text as ChakraText,
  Image
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { PiFileArrowUpBold } from 'react-icons/pi'
import Input from './Input'
import InputMask from 'react-input-mask'
import { MultiSelectMenu, RolesSelectMenu, Text } from '../atoms'
import { Status, UserRole } from '@/app/enums/enums'
import { api } from '@/app/api'
import { createUserCall } from '@/app/api/user'
import { useUserStore } from '@/app/hooks/useUserStore'

interface Class {
  id: string
  name: string
}

interface UserRegisterFormValues {
  name: string
  avatarUrl?: string | File | null
  email: string
  password: string
  confirmPassword: string
  organizationId: string
  role: UserRole
  primary_phone: string
  classIds: string[]
  status: Status
}

interface RegistrationUserDataFormProps {
  onSubmit: (values: UserRegisterFormValues) => Promise<void>
}

export const RegistrationUserDataForm: React.FC<
  RegistrationUserDataFormProps
> = ({ onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [classes, setClasses] = useState<{ label: string; value: string }[]>([])
  YupPassword(Yup)

  const { user } = useUserStore()

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/class')
        const classOptions = response.data.data.map((classes: Class) => ({
          label: classes.name,
          value: classes.id
        }))
        setClasses(classOptions)
      } catch (error) {
        console.error('Erro ao buscar oficinas:', error)
      }
    }

    fetchClasses()
  }, [])

  const formik = useFormik<UserRegisterFormValues>({
    initialValues: {
      name: '',
      avatarUrl: null,
      email: '',
      password: '',
      confirmPassword: '',
      organizationId: '',
      role: UserRole.ORG_TEACHER,
      primary_phone: '',
      classIds: [],
      status: Status.ACTIVE
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nome completo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório.'),
      avatarUrl: Yup.mixed().nullable(),
      password: Yup.string()
        .min(6, 'Ter pelo menos 6 caracteres')
        .minLowercase(1, 'Conter ao menos uma letra minúscula')
        .minUppercase(1, 'Conter ao menos uma letra maiúscula')
        .minSymbols(1, 'Incluir um símbolo especial (ex: !, @, #, $, etc.).')
        .required('Senha é obrigatória'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Senhas não são iguais.')
        .required('Confirmação de senha é obrigatória.'),
      role: Yup.mixed<UserRole>()
        .oneOf(Object.values(UserRole))
        .required('Cargo é obrigatório'),
      primary_phone: Yup.string(),
      classIds: Yup.array().of(Yup.string().uuid('ID de classe inválido')),
      status: Yup.mixed<Status>()
        .oneOf(Object.values(Status))
        .required('Status é obrigatório.')
    }),
    onSubmit: async (values) => {
      console.log('classIds:', values.classIds)
      const formData = new FormData()
      if (values.avatarUrl instanceof File) {
        formData.append('avatar', values.avatarUrl)
      }
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('role', values.role)
      formData.append('primary_phone', values.primary_phone)
      formData.append('status', values.status)

      let classIds = values.classIds
      if (!Array.isArray(classIds)) {
        classIds = [classIds]
      }

      classIds.forEach((classId) => {
        formData.append('classIds', classId)
      })

      if (user && user.organizationId) {
        formData.append('organizationId', user.organizationId)
      } else {
        console.error('organizationId não está disponível')
        return
      }

      const newUser = await createUserCall(formData)

      onSubmit(newUser)
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
      formik.setFieldValue('avatarUrl', file)
    }
  }
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  return (
    <form id="form-users" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Flex
        h={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
        gap={'10px'}
      >
        <Flex flexDir={'column'} h={'28.92%'}>
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
            flexDirection="column"
          >
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {values.avatarUrl ? (
              <Image
                src={URL.createObjectURL(values.avatarUrl as File)}
                alt="Prévia da Imagem"
                maxW={'100%'}
                maxH={'100%'}
              />
            ) : (
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
            )}
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          h={'10.27%'}
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
              Nome Completo
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
          <FormControl id="email" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
            >
              E-mail
            </FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
              placeholder="email@exemplo.com"
              mt={'5px'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'10.27%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="primary-phone" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
              fontSize={'14px'}
            >
              Telefone
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
          <FormControl w={['45%']}>
            <RolesSelectMenu
              label="Cargo"
              value={values.role}
              onChange={(value) => setFieldValue('role', value)}
              onBlur={handleBlur}
              isInvalid={touched.role && !!errors.role}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'10.27%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="password" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
            >
              Senha
            </FormLabel>
            <Input.Password
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              mt={'5px'}
              fontWeight={'500'}
            />
          </FormControl>
          <FormControl id="confirmPassword" w={['45%']}>
            <FormLabel
              fontWeight={'700'}
              ml={'5px'}
              mb={'0px'}
              color={'brand.gray60'}
            >
              Confirmar nova senha
            </FormLabel>
            <Input.Password
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              mt={'5px'}
              fontWeight={'500'}
            />
          </FormControl>
        </Flex>
        <Flex
          w={'100%'}
          h={'10.27%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControl id="classIds" w={['45%']}>
            <MultiSelectMenu
              label="Oficinas"
              name="classIds"
              options={classes}
              value={values.classIds}
              onChange={(value) => {
                const selectedClasses = Array.isArray(value) ? value : [value]
                formik.setFieldValue('classIds', selectedClasses)
              }}
              onBlur={handleBlur}
              isInvalid={touched.classIds && !!errors.classIds}
            />
            {touched.classIds && errors.classIds ? (
              <ChakraText color="red.500" mt={2}>
                {errors.classIds}
              </ChakraText>
            ) : null}
          </FormControl>
          <Flex w={'45%'} />
        </Flex>
      </Flex>
    </form>
  )
}
