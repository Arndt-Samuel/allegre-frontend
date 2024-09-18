import React, { useState, useEffect } from 'react'
import {
  Flex,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { AttendanceDataForm } from './AttendanceDataForm'
import { SmallAddIcon } from '@chakra-ui/icons'
import Input from './Input'
import { createAttendance } from '@/app/api/class'
import { useDebounce } from '@/app/hooks/useDebounce'

interface HeaderClassAttendanceProps {
  classId: string
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
}

export const HeaderClassAttendance: React.FC<HeaderClassAttendanceProps> = ({
  setStartDate,
  setEndDate,
  classId
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [startDate, setStartDateInternal] = useState<string>('')
  const [endDate, setEndDateInternal] = useState<string>('')

  const debouncedStartDate = useDebounce(startDate, 500)
  const debouncedEndDate = useDebounce(endDate, 500)

  useEffect(() => {
    setStartDate(debouncedStartDate)
  }, [debouncedStartDate, setStartDate])

  useEffect(() => {
    setEndDate(debouncedEndDate)
  }, [debouncedEndDate, setEndDate])

  const handleSaveAttendance = async (formData: FormData) => {
    try {
      await createAttendance(formData)

      toast({
        title: 'Presença salva com sucesso!',
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

  return (
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
        Presença
      </Text>
      <Input
        w={'30%'}
        type="date"
        name="startDate"
        placeholder="DD/MM/YYYY"
        mt={'5px'}
        fontSize={'16px'}
        fontWeight={'500'}
        value={startDate}
        onChange={(e) => setStartDateInternal(e.target.value)}
      />
      <Input
        w={'30%'}
        type="date"
        name="endDate"
        placeholder="DD/MM/YYYY"
        mt={'5px'}
        fontSize={'16px'}
        fontWeight={'500'}
        value={endDate}
        onChange={(e) => setEndDateInternal(e.target.value)}
      />
      <IconButton
        bg={'brand.primary'}
        borderRadius={'100'}
        _hover={{ bg: 'brand.purple50', color: 'brand.purple20' }}
        aria-label="Adicionar lista de chamada"
        icon={<SmallAddIcon color={'brand.white'} />}
        onClick={onOpen}
      />
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
            Adicionar Presença
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
            <AttendanceDataForm
              classId={classId}
              onClose={onClose}
              onSave={handleSaveAttendance}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
