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
import { HeaderStudentResponsibleList } from './HeaderStudentResponsibleList'
import { SubHeaderStudentResponsibleList } from './SubHeaderStudentResponsibleList'
import { StudentResponsibleCard } from './StudentResponsibleCard'
import { api } from '@/app/api'
import { UpdateResponsibleDataForm } from './UpdateResponsibleDataForm'
import { deleteStudentResponsibleCall } from '@/app/api/student'
import { Button } from '../atoms'

interface Responsible {
  id: string
  name: string
  avatarUrl: string
  degree_of_kinship: string
  primary_phone: string
  cpf: string
  rg: string
}

interface StudentResponsibleTableProps {
  studentId: string
  responsibles: Responsible[]
  onAddResponsible: (responsible: Responsible) => void
}

export const StudentResponsibleTable: React.FC<
  StudentResponsibleTableProps
> = ({ studentId, responsibles, onAddResponsible }) => {
  const [sortedResponsibles, setSortedResponsibles] =
    useState<Responsible[]>(responsibles)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedResponsibleId, setSelectedResponsibleId] = useState<
    string | null
  >(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const toast = useToast()

  useEffect(() => {
    const fetchResponsibles = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/student-responsible/${studentId}`)
        setSortedResponsibles(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao carregar responsáveis',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchResponsibles()
  }, [studentId, toast])

  const sortAscending = () => {
    const sorted = [...sortedResponsibles].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    setSortedResponsibles(sorted)
  }

  const sortDescending = () => {
    const sorted = [...sortedResponsibles].sort((a, b) =>
      b.name.localeCompare(a.name)
    )
    setSortedResponsibles(sorted)
  }

  const handleAddResponsible = (responsible: Responsible) => {
    setIsLoading(true)
    onAddResponsible(responsible)
    setTimeout(() => {
      setSortedResponsibles((prev) => [...prev, responsible])
      setIsLoading(false)
    }, 500)
  }

  const handleOpenModal = (responsibleId: string) => {
    setSelectedResponsibleId(responsibleId)
    onOpen()
  }

  const handleSuccess = () => {
    onClose()
    const fetchResponsibles = async () => {
      try {
        const response = await api.get(`/student-responsible/${studentId}`)
        setSortedResponsibles(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao carregar responsáveis',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
    fetchResponsibles()
  }

  const handleDeleteResponsible = async () => {
    if (selectedResponsibleId) {
      try {
        await deleteStudentResponsibleCall(selectedResponsibleId)
        setSortedResponsibles((prev) =>
          prev.filter((res) => res.id !== selectedResponsibleId)
        )
        toast({
          title: 'Responsável deletado com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setIsAlertOpen(false)
        onClose()
      } catch (error) {
        toast({
          title: 'Erro ao deletar responsável',
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
        <HeaderStudentResponsibleList
          studentId={studentId}
          onAddResponsible={handleAddResponsible}
        />
        <SubHeaderStudentResponsibleList
          onSortAscending={sortAscending}
          onSortDescending={sortDescending}
        />
        {isLoading ? (
          <Skeleton height="72px" my="10px" />
        ) : sortedResponsibles && sortedResponsibles.length > 0 ? (
          sortedResponsibles.map((responsible, index) => (
            <StudentResponsibleCard
              key={index}
              responsible={responsible}
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
              Nenhum responsável relacionado ao estudante
            </Text>
          </Flex>
        )}
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
            Editar Responsável
          </Text>
          <Text
            h={'2.54%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Atualize abaixo os dados do responsável do aluno
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            {selectedResponsibleId && (
              <UpdateResponsibleDataForm
                studentId={studentId}
                responsibleId={selectedResponsibleId}
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
                form="form-responsible"
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
              Deletar Responsável
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
                onClick={handleDeleteResponsible}
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
