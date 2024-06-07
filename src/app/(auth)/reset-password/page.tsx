'use client'
import { Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import { Input, Button } from '../../components'
import AuthLayout from '../layout'
import { ReactElement } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function ResetPassword(): ReactElement {
  const { handleSubmit, handleBlur, values, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: ''
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, 'Senha deve ter ao menos 6 caracteres')
          .required('Senha é obrigatório.'),
        confirmPassword: Yup.string()
          .min(6, 'confirmar a senha deve ter ao menos 6 caracteres')
          .required('confirmar a senha é obrigatório.')
          .oneOf([Yup.ref('password')], 'Senhas não são iguais.')
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
            <FormControl id="password" mt={['15px', '20px']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
              >
                Nova senha
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
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Flex>
    </AuthLayout>
  )
}
