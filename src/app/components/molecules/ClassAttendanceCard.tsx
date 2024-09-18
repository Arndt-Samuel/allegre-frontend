import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import IconButtonNav from '../atoms/IconButtonNav'

interface AttendanceCardProps {
  attendance: {
    id: string
    dateOfClass: string
    presentStudents: number
    totalStudents: number
  }
  onOpen: (attendanceId: string) => void
}

export const ClassAttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  onOpen
}) => {
  const formattedDate = new Date(attendance.dateOfClass).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
  )

  return (
    <Flex
      flexDir={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      w={'100%'}
      h={'72px'}
      pt={'12px'}
      pb={'12px'}
      pl={'24px'}
      pr={'24px'}
      borderTop={'solid 1px'}
      borderBottom={'solid 1px'}
      borderColor={'brand.gray20'}
    >
      <Flex alignItems={'center'} justifyContent={'flex-start'} w={'26.06%'}>
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          ml={'5px'}
        >
          {formattedDate}
        </Text>
      </Flex>
      <Flex w={'26.06%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {attendance.presentStudents}/{attendance.totalStudents}
        </Text>
      </Flex>
      <Flex w={'47.88%'} alignItems={'center'} justifyContent={'flex-end'}>
        <IconButtonNav
          aria-label="Edit attendance"
          icon={<PiCaretCircleRightBold size={24} />}
          color={'brand.gray60'}
          bg={'brand.white'}
          _hover={{
            bg: 'brand.white'
          }}
          onClick={() => onOpen(attendance.id)}
        />
      </Flex>
    </Flex>
  )
}
