import { Flex } from '@chakra-ui/react'
import { Text } from '../atoms'
import { ClassCardInformation } from './ClassCardInformation'

interface ClassInformationProps {
  classData: {
    data: {
      id: string
      name: string
      logoUrl: string
      place: string
      daysOfClasses: string
      startTime: string
      endTime: string
      classObservations: string
      responsibleClass: string
      studentCount: number
      userClasses: { user: { id: string; name: string } }[]
    }[]
  }
}

export const ClassInformation: React.FC<ClassInformationProps> = ({
  classData
}) => {
  return (
    <Flex
      w={'95%'}
      h={'auto'}
      flexDir={'column'}
      border={'1px solid'}
      borderRadius={'32px'}
      borderColor={'brand.gray30'}
      p={'24px'}
      justifyContent={'space-between'}
      gap={'16px'}
      mb={'20px'}
    >
      <Flex w={'100%'} h={'5.54%'}>
        <Text.CardTitle>Dados Cadastrais</Text.CardTitle>
      </Flex>
      <Flex flexDir={'column'}>
        {classData.data.map((classItem) => (
          <ClassCardInformation key={classItem.id} classData={classItem} />
        ))}
      </Flex>
    </Flex>
  )
}
