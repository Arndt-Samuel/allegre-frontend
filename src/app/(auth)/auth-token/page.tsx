'use client'

import { Text, Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { Input, Button } from '../../components'
import AuthLayout from '../layout'
import { ReactElement, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { verifyTokenCall } from '@/app/api/auth'
import { saveRecoveryToken, restoreRecoveryEmail } from '@/app/api/storage'

interface VerifyTokenValues {
  token: string
}

export default function VerifyToken(): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    async function getEmail() {
      const { data } = await restoreRecoveryEmail()
      if (data) {
        setEmail(data)
      } else {
        router.push('/forgot-password')
      }
    }
    getEmail()
  }, [router])

  const mutation = useMutation<void, Error, VerifyTokenValues>(
    async (data) => {
      await verifyTokenCall({ ...data, email })
      await saveRecoveryToken(data.token)
    },
    {
      onSuccess: () => {
        toast({
          title: 'Token verificado com sucesso',
          description: 'Agora você pode redefinir sua senha.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        router.push('/reset-password')
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || 'Ocorreu um erro, tente novamente.'
        )
        toast({
          title: 'Erro ao verificar token',
          description: error?.response?.data?.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  )

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<VerifyTokenValues>({
      initialValues: {
        token: ''
      },
      validationSchema: Yup.object({
        token: Yup.string().required('Token é obrigatório.')
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
        h={'100%'}
        borderRadius={'12px'}
        boxShadow={['none', 'lg']}
        borderColor={'brand.gray10'}
        p={['35px', '24px']}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <form onSubmit={handleSubmit}>
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            p={['35px', '24px']}
          >
            <Text
              mt="30px"
              color={'brand.gray60'}
              fontWeight={'500'}
              fontSize={'18px'}
            >
              Insira o token enviado para o seu e-mail:
            </Text>
            <FormControl id="token" mt={['15px', '20px']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
              >
                Token
              </FormLabel>
              <Input
                id="token"
                name="token"
                value={values.token}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.token}
                error={errors.token}
                placeholder="Token"
                w={['100%', '476px']}
                mt={'5px'}
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
              {mutation.isLoading ? 'Verificando...' : 'Verificar Token'}
            </Button>
          </Flex>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Flex>
    </AuthLayout>
  )
}
