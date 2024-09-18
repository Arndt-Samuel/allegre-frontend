import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button } from '../atoms'
import { SelectMenuBase } from '../atoms'
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
import { RegistrationClassForm } from './RegistrationClassForm'

interface HeaderClassListProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  userOptions: { label: string; value: string }[]
  selectedUser: string
  setSelectedUser: (userId: string) => void
}

export const HeaderClassList: React.FC<HeaderClassListProps> = ({
  searchTerm,
  setSearchTerm,
  userOptions,
  selectedUser,
  setSelectedUser
}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClassySubmit = async (values: any) => {
    try {
      onClose()
    } catch (error) {
      let errorMessage = 'Erro ao criar Classe'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar Classe',
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
        placeholder="Pesquisar Classes"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FormControl w={'30%'}>
        <SelectMenuBase
          name="responsible"
          label="Selecione o Responsável"
          options={userOptions}
          value={selectedUser}
          onChange={setSelectedUser}
        />
      </FormControl>
      <Button
        w={'25%'}
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
        Adicionar Oficina
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
            h={'3.09%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Adicionar Classe
          </Text>
          <Text
            h={'2.87%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Insira abaixo os dados da classe
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            <RegistrationClassForm onSubmit={handleClassySubmit} />
            <Flex
              alignItems={'center'}
              justifyContent={'flex-end'}
              h={'4.41%'}
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
                form="form-classes"
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
