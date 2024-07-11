'use client'
import React, { useState } from 'react'
import { Flex, Image, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { Input, Button, Link } from '../../components'
import AuthLayout from '../layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { loginCall } from '@/app/api/auth'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../hooks/useUserStore'

interface LoginFormValues {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
    avatarUrl: string
  }
}

export const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const toast = useToast()
  const router = useRouter()
  const setAll = useUserStore((state) => state.setAll)

  const mutation = useMutation<AuthResponse, Error, LoginFormValues>(
    (newUser) => loginCall(newUser),
    {
      onSuccess: (data) => {
        toast({
          title: 'Login feito com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setAll(data.user, data.accessToken)
        router.push('/students/create-student')
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || 'Ocorreu um erro, tente novamente.'
        )
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        console.error('Erro no login:', error)
      }
    }
  )
  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<LoginFormValues>({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório.'),
        password: Yup.string()
          .min(6, 'Senha deve ter ao menos 6 caracteres')
          .required('Senha é obrigatório.')
      }),
      onSubmit: (data) => {
        mutation.mutate(data)
      }
    })

  return (
    <AuthLayout>
      <Flex
        flexDir={'column'}
        w={['100%', '580px']}
        h={['100%', '600px']}
        borderRadius={'12px'}
        boxShadow={['none', 'lg']}
        borderColor={'brand.gray10'}
        p={['35px', '24px']}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Image
          src="/logo.svg"
          alt="Casa de Apoio Log"
          w={['130px', '113px']}
          h={['149px', '132px']}
        />
        <form onSubmit={handleSubmit}>
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <FormControl id="email" mt={['30px', '35px']}>
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
                w={['100%', '476px']}
                mt={'5px'}
              />
            </FormControl>
            <FormControl id="password" mt={['15px', '20px']}>
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
                w={['100%', '476px']}
                mt={'5px'}
                fontWeight={'500'}
              />
            </FormControl>
            <Button
              w={['100%', '476px']}
              h={'56px'}
              mt={['25px', '20px']}
              color={'brand.white'}
              type="submit"
              isLoading={mutation.isLoading}
            >
              {mutation.isLoading ? 'Carregando...' : 'Login'}
            </Button>
          </Flex>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Link href="/forgot-password" mt={['10px', '20px']}>
          Esqueceu a senha? Clique aqui.
        </Link>
      </Flex>
    </AuthLayout>
  )
}

export default Login
