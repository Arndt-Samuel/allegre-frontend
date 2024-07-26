'use client'
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import {
  NavBar,
  Header,
  IconButtonNav,
  UpdatingDataList
} from '../../../components'
import { api } from '@/app/api'
import { PiCaretLeftBold } from 'react-icons/pi'

const StudentUpdate = () => {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [studentData, setStudentData] = useState(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      if (id) {
        try {
          const response = await api.get(`/student?id=${id}`)
          setStudentData(response.data)
        } catch (error) {
          console.error('Failed to fetch student data', error)
        }
      }
    }
    fetchStudentData()
  }, [id])

  if (!studentData) {
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
            href="/students/students-table"
          />
        }
      >
        Atualizar dados do Aluno
      </Header>
      <UpdatingDataList studentId={id} />
    </Flex>
  )
}

export default StudentUpdate
