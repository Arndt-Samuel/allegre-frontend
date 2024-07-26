import React, { useState } from 'react'
import { Flex, Button, useToast } from '@chakra-ui/react'
import {
  RegistrationStudentDataForm,
  WorkshopForm,
  StudentAddressForm,
  SchoolDataForm,
  StudentFamilyFrameTable,
  StudentComplementaryDataForm
} from '../molecules'
import { createStudentCall } from '@/app/api/student'
import { StudentResponsibleTable } from '../molecules/StudentResponsibleTable'
import { StudentHealthForm } from '../molecules/StudentHealth'
import { StudentSocialServicesForm } from '../molecules/StudentSocialServices'
import { PiArrowArcRightBold, PiCheckCircleBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'

export const RegistrationDataList: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [studentId, setStudentId] = useState<string | null>(null)
  const [studentFormValues, setStudentFormValues] = useState<any>(null)
  const [addressFormValues, setAddressFormValues] = useState<any>(null)
  const [schoolDataFormValues, setSchoolDataFormValues] = useState<any>(null)
  const [responsibles, setResponsibles] = useState<any[]>([])
  const [relatives, setRelatives] = useState<any[]>([])
  const [workshopFormValues, setWorkshopFormValues] = useState<any>(null)
  const [healthFormValues, setHealthFormValues] = useState<any>(null)
  const [complementaryDataFormValues, setComplementaryDataFormValues] =
    useState<any>(null)
  const [socialServiceFormValues, setSocialServiceFormValues] =
    useState<any>(null)
  const [visitedTabs, setVisitedTabs] = useState([0])

  const handleStudentSubmit = async (values: any) => {
    try {
      setStudentFormValues(values)
      const response = await createStudentCall(values)
      setStudentId(response.id)
      toast({
        title: 'Estudante criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar estudante!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar estudante',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleAddressSubmit = async (values: any) => {
    try {
      setAddressFormValues(values)
      toast({
        title: 'Endereço criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar endereço!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar endereço!',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleSchoolDataSubmit = async (values: any) => {
    try {
      setSchoolDataFormValues(values)
      toast({
        title: 'Dados escolares criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar dados escolares!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar dados escolares!',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleWorkshopSubmit = async (values: any) => {
    try {
      setWorkshopFormValues(values)
      toast({
        title: 'Endereço criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar endereço!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar endereço!',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleHealthSubmit = async (values: any) => {
    try {
      setHealthFormValues(values)
      toast({
        title: 'Saúde criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar saúde!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar saúde',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleComplementaryDataSubmit = async (values: any) => {
    try {
      setComplementaryDataFormValues(values)
      toast({
        title: 'Dados complementares criado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar dados complementares!'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar dados complementares!',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleSocialServiceSubmit = async (values: any) => {
    try {
      setSocialServiceFormValues(values)
      toast({
        title: 'Serviços sociais criado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      handleNextStep()
    } catch (error) {
      let errorMessage = 'Erro ao criar serviços sociais'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: 'Erro ao criar serviços sociais',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleNextStep = () => {
    setActiveTab((prev) => {
      const nextTab = prev + 1
      if (!visitedTabs.includes(nextTab)) {
        setVisitedTabs([...visitedTabs, nextTab])
      }
      if (nextTab >= tabs.length) {
        router.push('/students/students-table')
      }
      return nextTab
    })
  }

  const handleSkipStep = () => {
    handleNextStep()
  }

  const handleAddResponsible = (responsible: any) => {
    setResponsibles((prev) => [...prev, responsible])
  }

  const handleAddRelatives = (relative: any) => {
    setRelatives((prev) => [...prev, relative])
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <RegistrationStudentDataForm
            onSubmit={handleStudentSubmit}
            savedData={studentFormValues}
          />
        )
      case 1:
        return (
          <StudentAddressForm
            studentId={studentId!}
            onSubmit={handleAddressSubmit}
            savedData={addressFormValues}
          />
        )
      case 2:
        return (
          <StudentResponsibleTable
            studentId={studentId!}
            responsibles={responsibles}
            onAddResponsible={handleAddResponsible}
          />
        )
      case 3:
        return (
          <SchoolDataForm
            studentId={studentId!}
            onSubmit={handleSchoolDataSubmit}
            savedData={schoolDataFormValues}
          />
        )
      case 4:
        return (
          <WorkshopForm
            studentId={studentId!}
            onSubmit={handleWorkshopSubmit}
            savedData={workshopFormValues}
          />
        )
      case 5:
        return (
          <StudentHealthForm
            studentId={studentId!}
            onSubmit={handleHealthSubmit}
            savedData={healthFormValues}
          />
        )
      case 6:
        return (
          <StudentComplementaryDataForm
            studentId={studentId!}
            onSubmit={handleComplementaryDataSubmit}
            savedData={complementaryDataFormValues}
          />
        )
      case 7:
        return (
          <StudentSocialServicesForm
            studentId={studentId!}
            onSubmit={handleSocialServiceSubmit}
            savedData={socialServiceFormValues}
          />
        )
      case 8:
        return (
          <StudentFamilyFrameTable
            studentId={studentId!}
            relatives={relatives}
            onAddFamily={handleAddRelatives}
          />
        )
      default:
        return (
          <RegistrationStudentDataForm
            onSubmit={handleStudentSubmit}
            savedData={studentFormValues}
          />
        )
    }
  }

  const tabs = [
    'Dados Cadastrais',
    'Endereço',
    'Responsáveis',
    'Dados Escolares',
    'Oficinas',
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
            onClick={() => {
              if (visitedTabs.includes(index)) {
                setActiveTab(index)
              }
            }}
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
            isDisabled={!visitedTabs.includes(index)}
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
            onClick={handleSkipStep}
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
                  .getElementById('form-workshop')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 5) {
                document
                  .getElementById('form-health')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 6) {
                document
                  .getElementById('form-complementary-data')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else if (activeTab === 7) {
                document
                  .getElementById('form-social-service')
                  ?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
              } else {
                handleNextStep()
              }
            }}
          >
            {activeTab === 2 ? 'Avançar' : 'Salvar e Avançar'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
