'use client'
import StudentsLayout from '../layout'
import { ReactElement } from 'react'
import { NavBar, StudentList } from '../../components'
import { Header } from '../../components'
import { Flex } from '@chakra-ui/react'

export default function StudentsTable(): ReactElement {
  return (
    <StudentsLayout>
      <NavBar />
      <Flex flexDir={'column'}>
        <Header>Alunos</Header>
        <StudentList />
      </Flex>
    </StudentsLayout>
  )
}
