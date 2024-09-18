import React from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import IconButtonNav from '../atoms/IconButtonNav'

interface ClassCardProps {
  classData: {
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
  }
}

export const ClassCard: React.FC<ClassCardProps> = ({ classData }) => (
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
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'20.06%'}>
      <Avatar
        w={'40px'}
        h={'40px'}
        borderRadius={'76px'}
        src={classData.logoUrl}
        backgroundSize="cover"
      />
      <Text
        color={'brand.gray60'}
        fontSize={'14px'}
        fontWeight={'700'}
        ml={'5px'}
      >
        {classData.name}
      </Text>
    </Flex>
    <Flex w={'14.20%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {classData.responsibleClass}
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {classData.studentCount} alunos
      </Text>
    </Flex>
    <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {classData.place}
      </Text>
    </Flex>
    <Flex w={'12.42%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {classData.daysOfClasses}
      </Text>
    </Flex>
    <Flex w={'12.42%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {classData.startTime} - {classData.endTime}
      </Text>
    </Flex>
    <Flex w={'15.2%'} alignItems={'center'} justifyContent={'flex-end'}>
      <IconButtonNav
        aria-label="Edit class arrow"
        icon={<PiCaretCircleRightBold size={24} />}
        color={'brand.gray60'}
        bg={'brand.white'}
        _hover={{
          bg: 'brand.white'
        }}
        href={`/classes/data-class/${classData.id}`}
      />
    </Flex>
  </Flex>
)
