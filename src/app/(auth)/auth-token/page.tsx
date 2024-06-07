'use client'
import { Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import { Input, Button, Link } from '../../components'
import AuthLayout from '../layout'
import { ReactElement } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AuthToken(): ReactElement {
  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        token: ''
      },
      validationSchema: Yup.object({
        token: Yup.string()
          .length(8, 'Token deve conter 6 caracteres.')
          .required('Token é obrigatório.')
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
        p={['30px', '24px']}
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
                error={errors.token}
                touched={touched.token}
                w={['100%', '476px']}
                mt={'5px'}
                fontWeight={'500'}
                placeholder="Ex: 00000000"
              />
            </FormControl>
            <Button
              w={['100%', '476px']}
              h={'56px'}
              mt={['25px', '20px']}
              color={'brand.white'}
              type="submit"
            >
              Avançar
            </Button>
          </Flex>
        </form>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Link mt={['10px', '20px']}>
            Não recebeu o código? Clique aqui para reenviar.
          </Link>
        </Flex>
      </Flex>
    </AuthLayout>
  )
}
