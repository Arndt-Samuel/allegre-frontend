'use client'

import { Flex, Image, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { Input, Button } from '../../components'
import AuthLayout from '../layout'
import { ReactElement, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { resetPasswordCall } from '@/app/api/auth'
import { restoreRecoveryEmail, restoreRecoveryToken } from '@/app/api/storage'

interface ResetPasswordValues {
  newPassword: string
  confirmPassword: string
}

export default function ResetPassword(): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    async function getEmailAndToken() {
      const emailResult = await restoreRecoveryEmail()
      const tokenResult = await restoreRecoveryToken()
      if (emailResult.data && tokenResult.data) {
        setEmail(emailResult.data)
        setToken(tokenResult.data)
      } else {
        router.push('/forgot-password')
      }
    }
    getEmailAndToken()
  }, [router])

  const mutation = useMutation<void, Error, ResetPasswordValues>(
    (data) => resetPasswordCall({ ...data, email, token }),
    {
      onSuccess: () => {
        toast({
          title: 'Senha redefinida com sucesso',
          description: 'Agora você pode fazer login com sua nova senha.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        router.push('/login')
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || 'Ocorreu um erro, tente novamente.'
        )
        toast({
          title: 'Erro ao redefinir senha',
          description: error?.response?.data?.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  )

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<ResetPasswordValues>({
      initialValues: {
        newPassword: '',
        confirmPassword: ''
      },
      validationSchema: Yup.object({
        newPassword: Yup.string()
          .min(8, 'Senha deve ter ao menos 8 caracteres')
          .required('Senha é obrigatória.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'Senhas não são iguais.')
          .required('Confirmação de senha é obrigatória.')
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
            <FormControl id="newPassword" mt={['15px', '20px']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
              >
                Nova senha
              </FormLabel>
              <Input.Password
                id="newPassword"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.newPassword}
                touched={touched.newPassword}
                w={['100%', '476px']}
                mt={'5px'}
                fontWeight={'500'}
              />
            </FormControl>
            <FormControl id="confirmPassword" mt={['15px', '20px']}>
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
              {mutation.isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Flex>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Flex>
    </AuthLayout>
  )
}
