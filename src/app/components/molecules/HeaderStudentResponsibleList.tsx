import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button, Text } from '../atoms'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { ResponsibleDataForm } from './ResponsibleDataForm'

interface HeaderStudentResponsibleListProps {
  studentId: string
  onAddResponsible: (responsible: any) => void
}

export const HeaderStudentResponsibleList: React.FC<
  HeaderStudentResponsibleListProps
> = ({ studentId, onAddResponsible }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleResponsibleSubmit = async (values: any) => {
    try {
      await onAddResponsible(values)
      toast({
        title: 'Responsável criado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      onClose()
    } catch (error) {
      let errorMessage = 'Erro ao criar Responsável'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar Responsável',
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
      <Text w={'32.41%'}>Responsáveis</Text>
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
        leftIcon={<SmallAddIcon w={'25px'} h={'25px'} />}
        onClick={onOpen}
      >
        Adicionar Responsável
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
            h={'2.54%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Adicionar Responsável
          </Text>
          <Text
            h={'2.54%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Insira abaixo os dados do responsável do aluno
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            <ResponsibleDataForm
              studentId={studentId}
              onSubmit={handleResponsibleSubmit}
            />
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
    </Flex>
  )
}
