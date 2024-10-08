'use client'
import StudentsLayout from '../layout'
import { ReactElement } from 'react'
import { NavBar, UserList } from '../../components'
import { Header } from '../../components'
import { Flex } from '@chakra-ui/react'

export default function UsersTable(): ReactElement {
  return (
    <StudentsLayout>
      <NavBar />
      <Flex flexDir={'column'}>
        <Header>Usuários</Header>
        <UserList />
      </Flex>
    </StudentsLayout>
  )
}
