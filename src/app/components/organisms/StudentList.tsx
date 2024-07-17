import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import {
  HeaderStudentList,
  StudentCard,
  SubHeaderStudentList,
  Pagination
} from '../molecules'
import { api } from '@/app/api'

interface Student {
  id: string
  name: string
  responsible: string
  primary_phone: string
  cpf: string
  workshops: {
    classId: string
    className: string
  }[]
  status: string
  avatarUrl: string
}

export const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const fetchStudents = async (classId?: string, search?: string) => {
    try {
      const response = await api.get(
        `/student?skip=0&take=1000${classId ? `&classId=${classId}` : ''}${
          search ? `&name=${search}` : ''
        }`
      )
      let fetchedStudents = response.data.data

      if (sortOrder) {
        fetchedStudents = fetchedStudents.sort((a: Student, b: Student) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name)
          } else {
            return b.name.localeCompare(a.name)
          }
        })
      }

      setStudents(fetchedStudents)
      setTotalPages(Math.ceil(fetchedStudents.length / 10))
      setTotalStudents(fetchedStudents.length)
      setCurrentPage(1)
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)
    }
  }

  const fetchClasses = async () => {
    try {
      const response = await api.get('/class')
      setClassOptions(
        response.data.data.map((classItem: { id: string; name: string }) => ({
          label: classItem.name,
          value: classItem.id
        }))
      )
    } catch (error) {
      console.error('Erro ao buscar oficinas:', error)
    }
  }

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order)
  }

  useEffect(() => {
    fetchStudents(selectedClass || undefined, searchTerm)
  }, [selectedClass, searchTerm, sortOrder])

  useEffect(() => {
    fetchClasses()
  }, [])

  const paginatedStudents = students.slice(
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
        <HeaderStudentList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          classOptions={classOptions}
          setSelectedClass={setSelectedClass}
        />
        <SubHeaderStudentList onSort={handleSort} />
        {paginatedStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Flex alignItems="center" justifyContent="flex-end" mt={4} mr={4}>
          <Text>
            Mostrando {paginatedStudents.length} de {totalStudents} alunos
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
