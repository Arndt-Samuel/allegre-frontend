'use client'
import {
  Text,
  Flex,
  Image,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react'
import { Input, Button } from '../../components'
import AuthLayout from '../layout'
import { ReactElement, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { forgotPasswordCall } from '@/app/api/auth'
import { saveItem } from '@/app/api/storage'

interface ForgotPasswordValues {
  email: string
}

export default function ForgotPassWord(): ReactElement {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const toast = useToast()
  const router = useRouter()

  const mutation = useMutation<void, Error, ForgotPasswordValues>(
    forgotPasswordCall,
    {
      onSuccess: async (data, variables) => {
        toast({
          title: 'E-mail de recuperação enviado',
          description:
            'Verifique seu e-mail para continuar a recuperação de senha.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        await saveItem('recoveryEmail', variables.email)
        router.push('/auth-token')
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || 'Ocorreu um erro, tente novamente.'
        )
        toast({
          title: 'Erro ao enviar e-mail de recuperação',
          description: error?.response?.data?.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  )

  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik<ForgotPasswordValues>({
      initialValues: {
        email: ''
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório.')
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
            p={['35px', '24px']}
          >
            <Text
              mt="30px"
              color={'brand.gray60'}
              fontWeight={'500'}
              fontSize={'18px'}
            >
              Digite abaixo seu e-mail que enviaremos um código de recuperação
              de senha:
            </Text>
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
            <Button
              w={['100%', '476px']}
              h={'56px'}
              mt={['25px', '20px']}
              color={'brand.white'}
              type="submit"
              isLoading={mutation.isLoading}
            >
              {mutation.isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
          </Flex>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Flex>
    </AuthLayout>
  )
}
