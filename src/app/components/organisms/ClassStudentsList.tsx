import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import {
  ClassStudentsCard,
  HeaderClassStudents,
  Pagination,
  SubHeaderClassStudents
} from '../molecules'
import { api } from '@/app/api'

interface Student {
  id: string
  student: {
    id: string
    name: string
    primary_phone: string
    avatarUrl: string
  }
}

interface ClassStudentsListProps {
  classId: string
}
export const ClassStudentsList: React.FC<ClassStudentsListProps> = ({
  classId
}) => {
  const [students, setStudents] = useState<Student[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const fetchStudents = async (search = '') => {
    try {
      const response = await api.get(
        `/student-classes?classId=${classId}&take=1000&studentName=${search}`
      )
      let fetchedStudents = response.data.data

      if (sortOrder) {
        fetchedStudents.sort((a: Student, b: Student) =>
          sortOrder === 'asc'
            ? a.student.name.localeCompare(b.student.name)
            : b.student.name.localeCompare(a.student.name)
        )
      }

      setStudents(fetchedStudents)
      setTotalPages(Math.ceil(fetchedStudents.length / 5))
      setTotalStudents(fetchedStudents.length)
      setCurrentPage(1)
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)
    }
  }

  useEffect(() => {
    fetchStudents(searchTerm)
  }, [searchTerm, sortOrder])

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order)
  }

  const paginatedStudents = students.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  )

  return (
    <Flex alignItems={'center'} justifyContent={'center'} w="100%">
      <Flex
        w={'90%'}
        minH={'60vh'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
      >
        <HeaderClassStudents
          classId={classId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <SubHeaderClassStudents onSort={handleSort} />
        {paginatedStudents.map((student, index) => (
          <ClassStudentsCard
            key={student.id || index}
            student={student.student}
          />
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
