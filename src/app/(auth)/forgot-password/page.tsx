'use client'
import { Text, Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import { Input, Button } from '../../components'
import AuthLayout from '../layout'
import { ReactElement } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Login(): ReactElement {
  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório.')
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
            >
              Enviar
            </Button>
          </Flex>
        </form>
      </Flex>
    </AuthLayout>
  )
}
