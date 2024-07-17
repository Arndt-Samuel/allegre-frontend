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
import { StudentStatusForm } from './StudentStatusForm'

interface HeaderStudentFamilyFrameProps {
  studentId: string
  onAddFamily: (relative: any) => void
}

export const HeaderStudentFamilyFrameList: React.FC<
  HeaderStudentFamilyFrameProps
> = ({ studentId, onAddFamily }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleFamilySubmit = async (values: any) => {
    try {
      await onAddFamily(values)
      toast({
        title: 'Familiar criado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      onClose()
    } catch (error) {
      let errorMessage = 'Erro ao criar Familiar'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar Familiar',
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
      <Text w={'32.41%'}>Quadro Familiar</Text>
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
        Adicionar
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
            h={'3.66%'}
            fontSize={'20px'}
            fontWeight={'800'}
            color={'brand.gray80'}
          >
            Adicionar Familiar
          </Text>
          <Text
            h={'3.40%'}
            fontSize={'16px'}
            fontWeight={'400'}
            color={'brand.gray60'}
          >
            Insira os dados abaixo para adicionar um membro ao quadro familiar
          </Text>
          <ModalCloseButton />
          <ModalBody h={'100%'}>
            <StudentStatusForm
              studentId={studentId}
              onSubmit={handleFamilySubmit}
            />
            <Flex
              alignItems={'center'}
              justifyContent={'flex-end'}
              h={'5.24%'}
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
                form="form-family-frame"
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
