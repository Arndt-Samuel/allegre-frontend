'use client'
import { Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import { Input, Button, Link } from '../../components'
import AuthLayout from '../layout'
import { ReactElement } from 'react'

export default function Login(): ReactElement {
  return (
    <AuthLayout>
      <Flex
        flexDir={'column'}
        w={'580px'}
        h={'600px'}
        border={'1px solid'}
        borderRadius={'12px'}
        boxShadow="lg"
        borderColor={'brand.gray10'}
        p={'24px'}
        alignItems={'center'}
      >
        <Image src="/logo.svg" alt="Casa de Apoio Logo" w="113px" h="132px" />
        <FormControl id="email" mt={'35px'}>
          <FormLabel fontWeight={'700'} ml={'5px'} color={'brand.gray60'}>
            Email
          </FormLabel>
          <Input placeholder="email@exemplo.com" />
        </FormControl>

        <FormControl id="password" mt={'30px'}>
          <FormLabel fontWeight={'700'} ml={'5px'} color={'brand.gray60'}>
            Senha
          </FormLabel>
          <Input.Password placeholder="*******************" />
        </FormControl>
        <Button w={'476px'} h={'56px'} mt={'30px'} color={'brand.white'}>
          Login
        </Button>
        <Link mt={'30px'}>Esqueceu a senha? Clique aqui.</Link>
      </Flex>
    </AuthLayout>
  )
}
