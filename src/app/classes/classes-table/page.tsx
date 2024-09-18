'use client'
import ClassesLayout from '../layout'
import { ReactElement } from 'react'
import { NavBar, ClassList } from '../../components'
import { Header } from '../../components'
import { Flex } from '@chakra-ui/react'

export default function ClassesTable(): ReactElement {
  return (
    <ClassesLayout>
      <NavBar />
      <Flex flexDir={'column'}>
        <Header>Oficinas</Header>
        <ClassList />
      </Flex>
    </ClassesLayout>
  )
}
