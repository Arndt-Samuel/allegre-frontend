import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const SubHeaderClassAttendance: React.FC = ({}) => (
  <Flex
    w={'100%'}
    h={'48px'}
    bg={'brand.gray05'}
    pt={'14px'}
    pb={'14px'}
    pl={'24px'}
    pr={'24px'}
  >
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'26.06%'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Data
      </Text>
    </Flex>
    <Flex w={'26.06%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Alunos Presentes
      </Text>
    </Flex>
    <Flex w={'47.88%'} />
  </Flex>
)
