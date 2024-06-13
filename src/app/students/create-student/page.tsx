'use client'
import StudentsLayout from '../layout'
import { ReactElement } from 'react'
import { NavBar } from '../../components'
import { Header } from '../../components'
import { Flex, IconButton } from '@chakra-ui/react'
import { PiCaretLeftBold } from 'react-icons/pi'
import { RegistrationDataList } from '@/app/components/organisms'

export default function StudentDetail(): ReactElement {
  return (
    <StudentsLayout>
      <NavBar />
      <Flex flexDir={'column'}>
        <Header
          iconButton={
            <IconButton
              w={'48px'}
              h={'48px'}
              mr={'10px'}
              aria-label="Add item"
              icon={<PiCaretLeftBold />}
              color={'brand.gray60'}
              bg="brand.white"
              _hover={{
                backgroundColor: 'brand.gray30',
                color: 'brand.white'
              }}
              borderRadius={'123px'}
              border={'1px solid'}
              borderColor={'brand.gray30'}
              size={'lg'}
            />
          }
        >
          Adicionar Aluno
        </Header>
        <RegistrationDataList />
      </Flex>
    </StudentsLayout>
  )
}
