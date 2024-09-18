import { Flex } from '@chakra-ui/react'
import React from 'react'
import { ClassInformation } from '../molecules/ClassInformation'
import { ClassStudentsList } from './ClassStudentsList'
import { ClassAttendanceList } from './ClassAttendanceList'

interface ClassDataProps {
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

export const ClassData: React.FC<ClassDataProps> = ({ classData }) => {
  const classId = classData.data[0].id

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      minH={'100vh'}
    >
      <Flex
        flexDir={'column'}
        w="94%"
        justifyContent="center"
        alignItems={'center'}
        mb={4}
      >
        <ClassInformation classData={classData} />
        <Flex
          w={'100%'}
          h={'100%'}
          flexDir={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <ClassAttendanceList classId={classId} />
          <ClassStudentsList classId={classId} />
        </Flex>
      </Flex>
    </Flex>
  )
}
