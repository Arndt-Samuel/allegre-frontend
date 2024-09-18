import React, { useState, useEffect } from 'react'
import {
  Flex,
  Text,
  Skeleton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { HeaderStudentFamilyFrameList } from './HeaderStudentFamilyFrame'
import { SubHeaderStudentFamilyFrameList } from './SubHeaderStudentFamilyFrame'
import { StudentFamilyFrameCard } from './StudentFamilyFrameCard'
import { FooterStudentFamilyFrameCard } from './FooterStudentFamilyFrame'
import { api } from '@/app/api'
import { UpdateStudentStatusForm } from './UpdateStudentStatusForm'
import { deleteStudentFamilyCall } from '@/app/api/student'
import { Button } from '../atoms'

interface Relative {
  id: string
  name: string
  dateOfBirth: string
  degree_of_kinship: string
  marital_status: string
  wage: string
  retirement: string
  allowance: string
  other_income: string
  informal_work: boolean
}

interface StudentFamilyFrameProps {
  studentId: string
  relatives: Relative[]
  onAddFamily: (relative: Relative) => void
}

export const StudentFamilyFrameTable: React.FC<StudentFamilyFrameProps> = ({
  studentId,
  onAddFamily
}) => {
  const [sortedRelatives, setSortedRelatives] = useState<Relative[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [perCapitaIncome, setPerCapitaIncome] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedRelativeId, setSelectedRelativeId] = useState<string | null>(
    null
  )
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const toast = useToast()

  useEffect(() => {
    const fetchRelatives = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/student-family/${studentId}`)
        setSortedRelatives(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao carregar familiares',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchRelatives()
  }, [studentId, toast])

  useEffect(() => {
    const parseCurrency = (value: string) => {
      return parseFloat(value.replace(/\./g, '').replace(',', '.'))
    }

    const total = sortedRelatives.reduce((sum, relative) => {
      return (
        sum +
        parseCurrency(relative.wage || '0') +
        parseCurrency(relative.retirement || '0') +
        parseCurrency(relative.allowance || '0') +
        parseCurrency(relative.other_income || '0')
      )
    }, 0)

    setTotalIncome(total)
    setPerCapitaIncome(total / sortedRelatives.length)
  }, [sortedRelatives])

  const handleAddFamily = (relative: Relative) => {
    setIsLoading(true)
    onAddFamily(relative)
    setTimeout(() => {
      setSortedRelatives((prev) => [...prev, relative])
      setIsLoading(false)
    }, 500)
  }

  const handleOpenModal = (relativeId: string) => {
    setSelectedRelativeId(relativeId)
    onOpen()
  }

  const handleSuccess = () => {
    onClose()
    const fetchRelatives = async () => {
      try {
        const response = await api.get(`/student-family/${studentId}`)
        setSortedRelatives(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao carregar familiares',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchRelatives()
  }

  const handleDeleteRelative = async () => {
    if (selectedRelativeId) {
      try {
        await deleteStudentFamilyCall(selectedRelativeId)
        setSortedRelatives((prev) =>
          prev.filter((rel) => rel.id !== selectedRelativeId)
        )
        toast({
          title: 'Familiar deletado com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setIsAlertOpen(false)
        onClose()
      } catch (error) {
        toast({
          title: 'Erro ao deletar familiar',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  }

  return (
    <Flex alignItems={'center'} justifyContent={'center'} w={'85%'}>
      <Flex
        w={'100%'}
        h={'auto'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
      >
        <HeaderStudentFamilyFrameList
          studentId={studentId}
          onAddFamily={handleAddFamily}
        />
        <SubHeaderStudentFamilyFrameList />
        {isLoading ? (
          <Skeleton height="72px" my="10px" />
        ) : sortedRelatives.length > 0 ? (
          sortedRelatives.map((relative) => (
            <StudentFamilyFrameCard
              key={relative.id}
              relative={relative}
              onOpen={handleOpenModal}
            />
          ))
        ) : (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            h={'100px'}
            borderTop={'solid 1px'}
            borderColor={'brand.gray20'}
          >
            <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
              Nenhum familiar relacionado ao estudante
            </Text>
          </Flex>
        )}
        <FooterStudentFamilyFrameCard
          totalIncome={totalIncome}
          perCapitaIncome={perCapitaIncome}
        />
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
            h={'2.54%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Editar Familiar
          </Text>
          <Text
            h={'2.54%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Atualize abaixo os dados do familiar do aluno
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            {selectedRelativeId && (
              <UpdateStudentStatusForm
                studentId={studentId}
                relativeId={selectedRelativeId}
                onSuccess={handleSuccess}
              />
            )}
            <Flex
              alignItems={'center'}
              justifyContent={'flex-end'}
              h={'7.34%'}
              w={'100%'}
            >
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
                onClick={() => setIsAlertOpen(true)}
              >
                Deletar
              </Button>
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
                _hover={{
                  bg: 'brand.purple50',
                  color: 'brand.purple20'
                }}
                fontSize={'16px'}
                fontWeight={700}
                form="form-family-frame"
                type="submit"
              >
                Confirmar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Familiar
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer esta ação posteriormente.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                color={'brand.white'}
                border={'1px solid'}
                _hover={{
                  bg: 'brand.purple50',
                  color: 'brand.purple20'
                }}
                fontSize={'16px'}
                fontWeight={700}
                onClick={() => setIsAlertOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                color={'red'}
                bg={'brand.white'}
                _hover={{
                  bg: 'red.500',
                  color: 'white'
                }}
                border={'1px solid'}
                borderColor={'red'}
                fontSize={'16px'}
                fontWeight={700}
                ml={3}
                onClick={handleDeleteRelative}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}
