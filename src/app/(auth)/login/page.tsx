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
              Email
            </FormLabel>
            <Input
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
              w={['100%', '476px']}
              mt={'5px'}
              fontWeight={'500'}
            />
          </FormControl>
        </Flex>
        <Button
          w={['95%', '476px']}
          h={'56px'}
          mt={['15px', '20px']}
          color={'brand.white'}
        >
          Login
        </Button>
        <Link mt={['10px', '20px']}>Esqueceu a senha? Clique aqui.</Link>
      </Flex>
    </AuthLayout>
  )
}
