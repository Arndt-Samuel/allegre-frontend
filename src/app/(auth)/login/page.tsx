'use client'
import { Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import { Input, Button, Link } from '../../components'
import AuthLayout from '../layout'
import { ReactElement } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Login(): ReactElement {
  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik({
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
        console.log({ data })
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
            >
              Login
            </Button>
          </Flex>
        </form>
        <Link href="/forgot-password" mt={['10px', '20px']}>
          Esqueceu a senha? Clique aqui.
        </Link>
      </Flex>
    </AuthLayout>
  )
}
