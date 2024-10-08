import React, { useEffect, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Image,
  Text as ChakraText,
  useToast
} from '@chakra-ui/react'
import { api } from '@/app/api'
import { UserRole } from '@/app/enums/enums'
import { MultiSelectMenu, RolesSelectMenu, Text } from '../atoms'
import Input from './Input'

interface Class {
  id: string
  name: string
}

interface UserInfosValues {
  id: string
  name: string
  avatarUrl?: string | null
  email: string
  organizationId: string
  role: UserRole
  primary_phone: string
  classes: Class[]
}

interface UserInfosProps {
  userId: string
}

export const UserInfo: React.FC<UserInfosProps> = ({ userId }) => {
  const [userInfo, setUserInfo] = useState<UserInfosValues | null>(null)
  const [classes, setClasses] = useState<{ label: string; value: string }[]>([])
  const toast = useToast()

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/class/?userId=${userId}`)
        const classOptions = response.data.data.map((classes: Class) => ({
          label: classes.name,
          value: classes.id
        }))
        setClasses(classOptions)
      } catch (error) {
        console.error('Erro ao buscar oficinas:', error)
      }
    }

    fetchClasses()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user?id=${userId}`)
        const user = response.data.data.find(
          (u: UserInfosValues) => u.id === userId
        )
        if (user) {
          setUserInfo(user)
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        toast({
          title: 'Erro',
          description:
            'Não foi possível buscar o usuário. Tente novamente mais tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchUser()
  }, [userId, toast])

  if (!userInfo) {
    return <ChakraText>Carregando...</ChakraText>
  }

  const classOptions = userInfo.classes.map((cls) => ({
    label: cls.name,
    value: cls.id
  }))

  return (
    <Flex
      h={'100%'}
      flexDir={'column'}
      justifyContent={'space-between'}
      gap={'10px'}
    >
      <Flex flexDir={'column'} h={'28.92%'}>
        <Text
          fontSize={'14px'}
          fontWeight={'700'}
          letterSpacing={'-1px'}
          lineHeight={'20px'}
          mb={'5px'}
          color={'brand.gray60'}
        >
          Foto 3x4
        </Text>
        <Flex
          w={'70%'}
          h={'13.31%'}
          borderRadius={'32px'}
          border={'1px dotted'}
          borderColor={'brand.gray30'}
          p={'24px'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection="column"
        >
          {userInfo.avatarUrl ? (
            <Image
              src={userInfo.avatarUrl}
              alt="Foto do Usuário"
              maxW={'100%'}
              maxH={'100%'}
            />
          ) : (
            <ChakraText>Sem foto disponível</ChakraText>
          )}
        </Flex>
      </Flex>
      <Flex
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id={'name'} w={['45%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Nome Completo
          </FormLabel>
          <Input
            name="name"
            isReadOnly
            value={userInfo.name}
            placeholder="Nome Completo"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="email" w={['45%']}>
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
            isReadOnly
            value={userInfo.email}
            placeholder="email@exemplo.com"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="primary-phone" w={['45%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Telefone
          </FormLabel>
          <Input
            id="primary-phone"
            name="primary_phone"
            isReadOnly
            value={userInfo.primary_phone}
            placeholder="(00) 00000-0000"
            mt={'5px'}
            fontSize={'16px'}
            fontWeight={'500'}
          />
        </FormControl>
        <FormControl w={['45%']}>
          <RolesSelectMenu
            value={userInfo.role}
            isDisabled={true}
            label="Cargo"
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="classIds" w={['45%']}>
          <MultiSelectMenu
            label="Oficinas"
            name="classIds"
            options={classes}
            value={userInfo.classes.map((cls) => cls.id)}
            isDisabled={true}
          />
        </FormControl>
        <Flex w={'45%'} />
      </Flex>
    </Flex>
  )
}
