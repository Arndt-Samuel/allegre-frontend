import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button } from '../atoms'
import {
  Flex,
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
import { StudentClassesForm } from './StudentClassesForm'
import { createStudentsClassCall } from '@/app/api/class'

interface HeaderClassStudentsProps {
  classId: string
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export const HeaderClassStudents: React.FC<HeaderClassStudentsProps> = ({
  searchTerm,
  setSearchTerm,
  classId
}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleClassStudentsSubmit = async (values: any) => {
    try {
      await createStudentsClassCall(values)
      onClose()
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar a presença',
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
      <Text fontSize={'24px'} fontWeight={600} w={'33%'}>
        Alunos
      </Text>
      <SearchBar
        placeholder="Pesquisar Alunos"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Button
        w={'33%'}
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
        Adicionar Alunos a Oficina
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
            <StudentClassesForm
              classId={classId}
              onClose={onClose}
              onSubmit={handleClassStudentsSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
