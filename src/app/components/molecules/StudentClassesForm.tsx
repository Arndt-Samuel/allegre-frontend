import React, { useEffect, useState, useCallback } from 'react'
import { Flex, Text, Checkbox, Avatar, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '@/app/api'
import { SearchBar } from './SearchBar'
import { Button } from '../atoms'
import { useDebounce } from '@/app/hooks/useDebounce'

interface Student {
  id: string
  name: string
  avatarUrl: string
}

interface StudentClass {
  student: Student
}

interface StudentClassesFormValues {
  classId: string
  studentIds: string[]
}

interface StudentClassesFormProps {
  classId: string
  onSubmit: (values: StudentClassesFormValues) => Promise<void>
  onClose: () => void
}

export const StudentClassesForm: React.FC<StudentClassesFormProps> = ({
  classId,
  onSubmit,
  onClose
}) => {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudents, setSelectedStudents] = useState<
    Record<string, boolean>
  >({})
  const [studentsInClass, setStudentsInClass] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const toast = useToast()

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const fetchStudents = useCallback(async () => {
    if (!debouncedSearchTerm && studentsInClass.size === 0) {
      try {
        const response = await api.get(`/student?take=1000`)
        const fetchedStudents: Student[] = response.data.data

        const sortedStudents = fetchedStudents.sort((a, b) =>
          a.name.localeCompare(b.name)
        )

        setStudents(sortedStudents)

        setSelectedStudents((prevSelected) => {
          const updated = { ...prevSelected }
          sortedStudents.forEach((student) => {
            if (!(student.id in updated)) {
              updated[student.id] = false
            }
          })
          return updated
        })
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
      }
    }
  }, [debouncedSearchTerm, studentsInClass.size])

  const fetchStudentsInClass = useCallback(async () => {
    try {
      const response = await api.get(
        `/student-classes?take=1000&classId=${classId}`
      )
      const fetchedStudentsInClass = response.data.data.map(
        (studentClass: StudentClass) => studentClass.student.id
      )
      setStudentsInClass(new Set(fetchedStudentsInClass))
    } catch (error) {
      console.error('Error fetching students in class:', error)
    }
  }, [classId])

  useEffect(() => {
    fetchStudentsInClass()
  }, [fetchStudentsInClass])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const formik = useFormik<StudentClassesFormValues>({
    initialValues: {
      classId,
      studentIds: []
    },
    validationSchema: Yup.object({
      studentIds: Yup.array().required('At least one student is required')
    }),
    onSubmit: async (values) => {
      try {
        await onSubmit(values)
        toast({
          title: 'Students added to the class successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        onClose()
      } catch (error) {
        toast({
          title: 'Error adding students',
          description: 'Please try again later',
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      }
    }
  })

  const handleToggleStudent = (studentId: string, isSelected: boolean) => {
    setSelectedStudents((prevSelected) => ({
      ...prevSelected,
      [studentId]: isSelected
    }))

    const selectedStudentIds = Object.keys(selectedStudents).filter(
      (id) => selectedStudents[id]
    )
    formik.setFieldValue('studentIds', selectedStudentIds)
  }

  const handleToggleAll = (isSelected: boolean) => {
    const updatedSelectedStudents = students.reduce(
      (acc, student) => {
        if (!studentsInClass.has(student.id)) {
          acc[student.id] = isSelected
        }
        return acc
      },
      { ...selectedStudents }
    )

    setSelectedStudents(updatedSelectedStudents)

    const selectedStudentIds = Object.keys(updatedSelectedStudents).filter(
      (id) => updatedSelectedStudents[id]
    )
    formik.setFieldValue('studentIds', selectedStudentIds)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        w={'90%'}
        minH={'60vh'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          w={'100%'}
          h={'80px'}
          pt={'16px'}
          pb={'16px'}
          pl={'24px'}
          pr={'24px'}
        >
          <Text fontSize={'24px'} fontWeight={600} w={'30%'}>
            Alunos
          </Text>
          <SearchBar
            placeholder="Pesquisar Alunos"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Flex>
        <Flex
          flexDir={'column'}
          w={'100%'}
          h={'48px'}
          bg={'brand.gray05'}
          pb={'14px'}
          pl={'24px'}
          pr={'24px'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
        >
          <Checkbox onChange={(event) => handleToggleAll(event.target.checked)}>
            Selecionar alunos
          </Checkbox>
          <Text>Clique nos alunos que deseja adicionar à classe</Text>
        </Flex>
        <Flex flexDir="column" overflowY="auto" maxH="50vh">
          {students.map((student) => (
            <Flex
              key={student.id}
              flexDir={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              w={'100%'}
              h={'72px'}
              pt={'12px'}
              pb={'12px'}
              pl={'24px'}
              pr={'24px'}
              borderTop={'solid 1px'}
              borderBottom={'solid 1px'}
              borderColor={'brand.gray20'}
            >
              <Flex alignItems={'center'} justifyContent={'flex-start'}>
                <Checkbox
                  isChecked={selectedStudents[student.id]}
                  onChange={(event) =>
                    handleToggleStudent(student.id, event.target.checked)
                  }
                  isDisabled={studentsInClass.has(student.id)}
                />
              </Flex>
              <Flex
                alignItems={'center'}
                justifyContent={'flex-start'}
                ml="10px"
              >
                <Avatar
                  w={'40px'}
                  h={'40px'}
                  borderRadius={'76px'}
                  backgroundSize="cover"
                  src={student.avatarUrl}
                />
                <Text
                  color={'brand.gray60'}
                  fontSize={'14px'}
                  fontWeight={'700'}
                  ml={'5px'}
                >
                  {student.name || 'Nome Indisponível'}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex mt="24px" justifyContent="flex-end">
        <Button
          w={'18.90%'}
          h={'48px'}
          color={'brand.primary'}
          bg={'brand.white'}
          _hover={{
            bg: 'red',
            color: 'brand.white',
            borderColor: 'red'
          }}
          border={'1px solid'}
          borderColor={'brand.primary'}
          fontSize={'16px'}
          fontWeight={700}
          mr={3}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          w={'18.90%'}
          h={'48px'}
          color={'brand.white'}
          border={'1px solid'}
          _hover={{ bg: 'brand.purple50', color: 'brand.purple20' }}
          fontSize={'16px'}
          fontWeight={700}
          type="submit"
        >
          Confirmar
        </Button>
      </Flex>
    </form>
  )
}
