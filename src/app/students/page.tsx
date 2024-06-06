'use client'
import HomeLayout from './layout'
import { ReactElement } from 'react'
import { NavBar, StudentList } from '../components'
import { Header } from '../components'
import { Flex } from '@chakra-ui/react'

export default function Students(): ReactElement {
  return (
    <HomeLayout>
      <NavBar />
      <Flex flexDir={'column'}>
        <Header>Alunos</Header>
        <StudentList />
      </Flex>
    </HomeLayout>
  )
}
