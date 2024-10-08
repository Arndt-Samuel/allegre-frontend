import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button, RolesSelectMenu } from '../atoms'
import {
  Flex,
  FormControl,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { SearchBar } from './SearchBar'
import { SelectMenuBase } from '../atoms'
import { RegistrationUserDataForm } from './RegistrationUserDataForm'

interface HeaderUserListProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  classOptions: { label: string; value: string }[]
  selectedClass: string
  setSelectedClass: (classId: string) => void
  selectedRoles: string
  setSelectedRoles: (userId: string) => void
}

export const HeaderUserList: React.FC<HeaderUserListProps> = ({
  searchTerm,
  setSearchTerm,
  classOptions,
  selectedClass,
  setSelectedClass,
  selectedRoles,
  setSelectedRoles
}) => {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUserSubmit = async () => {
    try {
      onClose()
    } catch (error) {
      let errorMessage = 'Erro ao criar Usuário'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar Usuário',
        description: errorMessage,
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
      <SearchBar
        placeholder="Pesquisar Usuários"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FormControl w={'24.69%'}>
        <RolesSelectMenu
          value={selectedRoles}
          onChange={setSelectedRoles}
          includeAllOption={true}
        />
      </FormControl>
      <FormControl w={'24.69%'}>
        <SelectMenuBase
          name="class"
          options={classOptions}
          value={selectedClass}
          onChange={setSelectedClass}
        />
      </FormControl>
      <Button
        w={'15.82%'}
        h={'48px'}
        color={'brand.white'}
        border={'1px solid'}
        _hover={{
          bg: 'brand.purple50',
          color: 'brand.purple20'
        }}
        fontSize={'16px'}
        fontWeight={700}
        leftIcon={<SmallAddIcon w={'25px'} h={'25px'} />}
        onClick={onOpen}
      >
        Adicionar Usuário
      </Button>
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
            h={'3.78%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Adicionar Usuário
          </Text>
          <Text
            h={'3.51%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Cadastre os usuários da organização
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            <RegistrationUserDataForm onSubmit={handleUserSubmit} />
            <Flex
              alignItems={'center'}
              justifyContent={'flex-end'}
              h={'5.41%'}
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
                form="form-users"
                type="submit"
              >
                Confirmar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
