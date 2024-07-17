import React, { useState } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { UpdatingStudentDataForm } from '../molecules'
import { PiArrowArcRightBold, PiCheckCircleBold } from 'react-icons/pi'

interface UpdatingDataListProps {
  studentId: string
}

export const UpdatingDataList: React.FC<UpdatingDataListProps> = ({
  studentId
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [visitedTabs, setVisitedTabs] = useState([0])

  const handleNextStep = () => {
    setActiveTab((prev) => {
      const nextTab = prev + 1
      if (!visitedTabs.includes(nextTab)) {
        setVisitedTabs([...visitedTabs, nextTab])
      }
      return nextTab
    })
  }

  const handleSkipStep = () => {
    handleNextStep()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <UpdatingStudentDataForm
            studentId={studentId}
            onSuccess={handleNextStep}
          />
        )
      default:
        return (
          <UpdatingStudentDataForm
            studentId={studentId}
            onSuccess={handleNextStep}
          />
        )
    }
  }

  const tabs = ['Dados do Aluno']

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
