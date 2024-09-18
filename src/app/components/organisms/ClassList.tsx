import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import {
  HeaderClassList,
  SubHeaderClassList,
  ClassCard,
  Pagination
} from '../molecules'
import { api } from '@/app/api'

interface Class {
  id: string
  name: string
  logoUrl: string
  place: string
  daysOfClasses: string
  startTime: string
  endTime: string
  classObservations: string
  responsibleClass: string
  studentCount: number
  userClasses: { user: { id: string; name: string } }[]
}

export const ClassList: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalClasses, setTotalClasses] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [userOptions, setUserOptions] = useState<
    { label: string; value: string }[]
  >([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const fetchClasses = async (page = 1, userId?: string, search?: string) => {
    try {
      const response = await api.get(
        `/class?skip=${(page - 1) * 10}&take=10${userId ? `&userId=${userId}` : ''}${
          search ? `&name=${search}` : ''
        }`
      )
      const fetchedClasses = response.data.data

      if (sortOrder) {
        fetchedClasses.sort((a: Class, b: Class) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name)
          } else {
            return b.name.localeCompare(a.name)
          }
        })
      }

      setClasses(fetchedClasses)
      setTotalPages(Math.ceil(response.data.total / 10))
      setTotalClasses(response.data.total)
      setCurrentPage(page)
    } catch (error) {
      console.error('Erro ao buscar oficinas:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user?role=ORG_TEACHER')
      const uniqueUsers = response.data.data

      setUserOptions([
        { label: 'Todas as oficinas', value: '' },
        ...uniqueUsers.map((user: { id: string; name: string }) => ({
          label: user.name,
          value: user.id
        }))
      ])
    } catch (error) {
      console.error('Erro ao buscar professores:', error)
    }
  }

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order)
  }

  useEffect(() => {
    fetchClasses(currentPage, selectedUser || undefined, searchTerm)
  }, [selectedUser, searchTerm, sortOrder, currentPage])

  useEffect(() => {
    fetchUsers()
  }, [])

  const paginatedClasses = classes.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  )

  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <Flex
        w={'84%'}
        h={'auto'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
      >
        <HeaderClassList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userOptions={userOptions}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <SubHeaderClassList onSort={handleSort} />
        {paginatedClasses.map((classItem) => (
          <ClassCard key={classItem.id} classData={classItem} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Flex alignItems="center" justifyContent="flex-end" mt={4} mr={4}>
          <Text>
            Mostrando {paginatedClasses.length} de {totalClasses} oficinas
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
