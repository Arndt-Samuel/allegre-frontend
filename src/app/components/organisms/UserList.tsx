import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
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
  HeaderUserList,
  SubHeaderUserList,
  UserCard,
  Pagination,
  UserInfo
} from '../molecules'
import { api } from '@/app/api'
import { Status, UserRole } from '@/app/enums/enums'
import { useUserStore } from '@/app/hooks/useUserStore'
import { updateUserStatus } from '@/app/api/user'

interface User {
  id: string
  name: string
  email: string
  primary_phone: string
  role: UserRole
  classes: {
    classId: string
    className: string
  }[]
  status: Status
  avatarUrl: string
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([{ label: 'Todos Usuários', value: '' }])
  const [selectedRoles, setSelectedRoles] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedUserStatus, setSelectedUserStatus] = useState<Status | null>(
    null
  )
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = useUserStore()

  const toast = useToast()

  const fetchUsers = async (
    classId?: string,
    role?: string,
    search?: string,
    page: number = 1
  ) => {
    try {
      const skip = (page - 1) * 10
      const take = 10
      const organizationId = user?.organizationId

      if (!organizationId) {
        console.error('organizationId não está disponível')
        return
      }

      const response = await api.get(
        `/user?skip=${skip}&take=${take}&organizationId=${organizationId}${
          classId ? `&classId=${classId}` : ''
        }${role ? `&role=${role}` : ''}${search ? `&name=${search}` : ''}`
      )
      let fetchedUsers: User[] = response.data.data

      if (sortOrder) {
        fetchedUsers = fetchedUsers.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name)
          } else {
            return b.name.localeCompare(a.name)
          }
        })
      }

      setUsers(fetchedUsers)
      setTotalPages(Math.ceil(response.data.total / 10))
      setTotalUsers(response.data.total)
      setCurrentPage(page)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  const fetchClasses = async () => {
    try {
      const response = await api.get('/class')
      setClassOptions([
        { label: 'Todos Usuários', value: '' },
        ...response.data.data.map((classes: { id: string; name: string }) => ({
          label: classes.name,
          value: classes.id
        }))
      ])
    } catch (error) {
      console.error('Erro ao buscar oficinas:', error)
    }
  }

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order)
  }

  const handleOpenModal = (userId: string) => {
    setSelectedUserId(userId)

    const user = users.find((u) => u.id === userId)
    setSelectedUserStatus(user?.status || null)

    onOpen()
  }

  const handleCloseModal = () => {
    setSelectedUserId(null)
    setSelectedUserStatus(null)
    onClose()
  }

  useEffect(() => {
    if (user?.organizationId) {
      fetchUsers(
        selectedClass || undefined,
        selectedRoles || undefined,
        searchTerm,
        currentPage
      )
    }
  }, [
    selectedClass,
    selectedRoles,
    searchTerm,
    sortOrder,
    currentPage,
    user?.organizationId
  ])

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleToggleUserStatus = async () => {
    if (selectedUserId && selectedUserStatus) {
      try {
        const newStatus =
          selectedUserStatus === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE

        await updateUserStatus(selectedUserId, newStatus)

        toast({
          title: `Usuário ${
            newStatus === Status.ACTIVE ? 'ativado' : 'desativado'
          } com sucesso`,
          status: 'success',
          duration: 9000,
          isClosable: true
        })

        setIsAlertOpen(false)
        onClose()

        fetchUsers(
          selectedClass || undefined,
          selectedRoles || undefined,
          searchTerm,
          currentPage
        )
      } catch (error) {
        toast({
          title: 'Erro ao atualizar o status do usuário',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  }

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
        <HeaderUserList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          classOptions={classOptions}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
        <SubHeaderUserList onSort={handleSort} />
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onOpen={() => handleOpenModal(user.id)}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Flex alignItems="center" justifyContent="flex-end" mt={4} mr={4}>
          <Text>
            Mostrando {users.length} de {totalUsers} usuários
          </Text>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
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
            Informações do Usuário
          </Text>
          <Text
            h={'2.54%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Visualize as informações do usuário abaixo
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            {selectedUserId && <UserInfo userId={selectedUserId} />}
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
                onClick={handleCloseModal}
              >
                Fechar
              </Button>
              <Button
                w={'18.90%'}
                h={'48px'}
                color={'brand.primary'}
                bg={'brand.white'}
                _hover={{
                  bg: selectedUserStatus === Status.ACTIVE ? 'red' : 'green',
                  color: 'brand.white',
                  borderColor:
                    selectedUserStatus === Status.ACTIVE ? 'red' : 'green'
                }}
                border={'1px solid'}
                borderColor={'brand.primary'}
                fontSize={'16px'}
                fontWeight={700}
                mr={3}
                onClick={() => setIsAlertOpen(true)}
              >
                {selectedUserStatus === Status.ACTIVE ? 'Desativar' : 'Ativar'}
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
              {selectedUserStatus === Status.ACTIVE
                ? 'Desativar Usuário'
                : 'Ativar Usuário'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {selectedUserStatus === Status.ACTIVE
                ? 'Tem certeza? O usuário ficará inativo e não poderá fazer nenhuma alteração!'
                : 'Tem certeza? O usuário será ativado e poderá acessar o sistema!'}
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
                color={selectedUserStatus === Status.ACTIVE ? 'red' : 'green'}
                bg={'brand.white'}
                _hover={{
                  bg:
                    selectedUserStatus === Status.ACTIVE
                      ? 'red.500'
                      : 'green.500',
                  color: 'white'
                }}
                border={'1px solid'}
                borderColor={
                  selectedUserStatus === Status.ACTIVE ? 'red' : 'green'
                }
                fontSize={'16px'}
                fontWeight={700}
                ml={3}
                onClick={handleToggleUserStatus}
              >
                {selectedUserStatus === Status.ACTIVE ? 'Desativar' : 'Ativar'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}
