import React, { useState } from 'react'
import {
  Flex,
  Button,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import {
  UpdateStudentDataForm,
  UpdateStudentAddressForm,
  UpdateSchoolDataForm,
  UpdateStudentHealthForm,
  UpdateStudentComplementaryDataForm,
  UpdateStudentSocialServicesForm,
  StudentFamilyFrameTable
} from '../molecules'
import { PiArrowArcRightBold, PiCheckCircleBold } from 'react-icons/pi'
import { StudentResponsibleTable } from '../molecules/StudentResponsibleTable'
import { useRouter } from 'next/navigation'
import { deleteStudentCall } from '@/app/api/student'

interface UpdatingDataListProps {
  studentId: string
}

export const UpdatingDataList: React.FC<UpdatingDataListProps> = ({
  studentId
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const toast = useToast()
  const router = useRouter()

  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }

  const handleDeleteStudent = async () => {
    try {
      await deleteStudentCall(studentId)
      toast({
        title: 'Aluno deletado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      onClose()
      router.push('/students/students-table')
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar aluno',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleFinalize = () => {
    router.push('/students/students-table')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <UpdateStudentDataForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 1:
        return (
          <UpdateStudentAddressForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 2:
        return (
          <StudentResponsibleTable
            studentId={studentId}
            responsibles={[]}
            onAddResponsible={() => {}}
          />
        )
      case 3:
        return (
          <UpdateSchoolDataForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 4:
        return (
          <UpdateStudentHealthForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 5:
        return (
          <UpdateStudentComplementaryDataForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 6:
        return (
          <UpdateStudentSocialServicesForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
      case 7:
        return (
          <StudentFamilyFrameTable
            studentId={studentId}
            relatives={[]}
            onAddFamily={() => {}}
          />
        )
      default:
        return (
          <UpdateStudentDataForm
            studentId={studentId}
            onSuccess={() => handleTabChange(activeTab + 1)}
          />
        )
    }
  }

  const tabs = [
    'Dados do Aluno',
    'Endereço',
    'Responsáveis',
    'Dados Escolares',
    'Saúde',
    'Dados Complementares',
    'Serviços Sociais',
    'Quadro Familiar'
  ]

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      minH={'100vh'}
    >
      <Flex
        w="94%"
        justifyContent="space-evenly"
        alignItems={'flex-start'}
        mb={4}
      >
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => handleTabChange(index)}
            variant="solid"
            bg={activeTab === index ? 'brand.purple05' : 'transparent'}
            color={activeTab === index ? 'brand.primary' : 'brand.gray60'}
            borderRadius={activeTab === index ? '32px' : 'none'}
            _hover={{
              borderRadius: '32px',
              bg: 'brand.purple05',
              color: 'brand.primary'
            }}
            border={'none'}
            fontSize={'16px'}
            fontWeight={600}
          >
            {tab}
          </Button>
        ))}
      </Flex>
      {renderTabContent()}
      <Flex
        w={'84%'}
        h={'206px'}
        flexDir={'row'}
        p={'24px'}
        justifyContent={'space-between'}
        alignItems={'flex-end'}
        mt={'16px'}
        gap={'24px'}
      >
        <Flex
          w={'100%'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={'16px'}
        >
          <Button
            w={'12.18%'}
            h={'56px'}
            color={'brand.primary'}
            bg={'brand.white'}
            _hover={{
              bg: 'brand.purple50',
              color: 'brand.white'
            }}
            border={'1px solid'}
            borderRadius={'1234px'}
            borderColor={'brand.primary'}
            fontSize={'18px'}
            fontWeight={700}
            rightIcon={<PiArrowArcRightBold size={20} />}
            onClick={() => handleTabChange(activeTab + 1)}
          >
            Pular
          </Button>
          <Button
            w={'14.76%'}
            h={'56px'}
            border={'1px solid'}
            borderRadius={'1234px'}
            bg={'brand.primary'}
            _hover={{
              bg: 'brand.purple50',
              color: 'brand.purple20'
            }}
            fontSize={'18px'}
            fontWeight={700}
            color={'brand.white'}
            leftIcon={<PiCheckCircleBold size={20} />}
            onClick={() => {
              if (activeTab === 0) {
                document
                  .getElementById('form-0')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 1) {
                document
                  .getElementById('form-address')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 3) {
                document
                  .getElementById('form-school-data')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 4) {
                document
                  .getElementById('form-health')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 5) {
                document
                  .getElementById('form-complementary-data')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 6) {
                document
                  .getElementById('form-social-service')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 7) {
                handleFinalize()
              }
            }}
          >
            {activeTab === tabs.length - 1 ? 'Finalizar' : 'Salvar e Avançar'}
          </Button>
        </Flex>
        {activeTab === tabs.length - 1 && (
          <Button
            w={'14.76%'}
            h={'56px'}
            border={'1px solid'}
            borderRadius={'1234px'}
            bg={'red.500'}
            _hover={{
              bg: 'red.700',
              color: 'white'
            }}
            fontSize={'18px'}
            fontWeight={700}
            color={'white'}
            onClick={onOpen}
          >
            Deletar Aluno
          </Button>
        )}
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Aluno
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer esta ação posteriormente.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteStudent} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}
