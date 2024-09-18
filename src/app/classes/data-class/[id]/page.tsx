'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { NavBar, Header, IconButtonNav, ClassData } from '../../../components'
import { api } from '@/app/api'
import { PiCaretLeftBold } from 'react-icons/pi'
import ClassesLayout from '../../layout'

const DataClass: React.FC = () => {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    const fetchClassData = async () => {
      if (id) {
        try {
          const response = await api.get(`/class?id=${id}`)
          setClassData(response.data)
        } catch (error) {
          console.error('Failed to fetch class data', error)
        }
      }
    }
    fetchClassData()
  }, [id])

  if (!classData) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100%"
      >
        <Spinner size="xl" color="brand.primary" />
      </Flex>
    )
  }

  return (
    <ClassesLayout>
      <Flex flexDir={'column'}>
        <NavBar />
        <Header
          iconButton={
            <IconButtonNav
              w={'48px'}
              h={'48px'}
              mr={'10px'}
              aria-label="Go back"
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
              href="/classes/classes-table"
            />
          }
        >
          Dados da Classe
        </Header>
        <ClassData classData={classData} />
      </Flex>
    </ClassesLayout>
  )
}

export default DataClass
