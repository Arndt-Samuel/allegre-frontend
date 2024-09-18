import React, { useEffect, useState } from 'react'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import {
  HeaderClassAttendance,
  Pagination,
  SubHeaderClassAttendance
} from '../molecules'
import { api } from '@/app/api'
import { ClassAttendanceCard } from '../molecules/ClassAttendanceCard'
import { useDebounce } from '@/app/hooks/useDebounce'
import { UpdateAttendanceDataForm } from '../molecules/UpdateAttendanceDataForm'
import { updateAttendance } from '@/app/api/class'

interface AttendanceDetails {
  studentId: string
  isPresent: boolean
}

interface Attendances {
  id: string
  dateOfClass: string
  photoUrl: string | null
  presentStudents: number
  totalStudents: number
  attendanceDetails: AttendanceDetails[]
}

interface ClassAttendanceListProps {
  classId: string
}

export const ClassAttendanceList: React.FC<ClassAttendanceListProps> = ({
  classId
}) => {
  const [attendance, setAttendance] = useState<Attendances[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<string>('')
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendances | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const debouncedStartDate = useDebounce(startDate, 500)
  const debouncedEndDate = useDebounce(endDate, 500)

  const fetchAttendances = async (page = 1) => {
    try {
      const response = await api.get(
        `/class-attendance/range?classId=${classId}&skip=${(page - 1) * 5}&take=5${debouncedStartDate ? `&startDate=${debouncedStartDate}` : ''}${debouncedEndDate ? `&endDate=${debouncedEndDate}` : ''}`
      )

      const fetchedAttendances = response.data.data.map((item: any) => ({
        id: item.id,
        dateOfClass: item.dateOfClass,
        presentStudents: item.presentStudents || 0,
        totalStudents: item.totalStudents || 0
      }))

      setAttendance(fetchedAttendances)
      setTotalPages(Math.ceil(response.data.total / 5))
      setTotalStudents(response.data.total)
      setCurrentPage(page)
    } catch (error) {
      console.error('Erro ao buscar presenças:', error)
    }
  }

  const handleUpdateAttendance = async (formData: FormData) => {
    try {
      const attendanceId = formData.get('classAttendanceId') as string
      if (!attendanceId) {
        throw new Error('ID da presença não encontrado')
      }

      await updateAttendance(attendanceId, formData)

      toast({
        title: 'Presença atualizada com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      onClose()
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar presença',
        description: error.message || 'Tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleOpenModal = (attendanceId: string) => {
    const selectedAttendance = attendance.find((a) => a.id === attendanceId)
    if (selectedAttendance) {
      setSelectedAttendanceId(attendanceId)
      setSelectedAttendance(selectedAttendance)
      onOpen()
    }
  }

  useEffect(() => {
    fetchAttendances(currentPage)
  }, [currentPage, debouncedStartDate, debouncedEndDate])

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
        <HeaderClassAttendance
          classId={classId}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <SubHeaderClassAttendance />
        {attendance.map((attendance) => (
          <ClassAttendanceCard
            key={attendance.id}
            attendance={attendance}
            onOpen={handleOpenModal}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Flex alignItems="center" justifyContent="flex-end" mt={4} mr={4}>
          <Text>
            Mostrando {attendance.length} de {totalStudents} lista de presença
          </Text>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={'32px'}
          gap={'10px'}
          p={'24px'}
          maxW="800px"
        >
          <Text
            h={'3.09%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Atualizar Presença
          </Text>
          <Text
            h={'2.87%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Insira abaixo os dados da presença
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            <UpdateAttendanceDataForm
              classAttendanceId={selectedAttendanceId}
              onSave={handleUpdateAttendance}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
