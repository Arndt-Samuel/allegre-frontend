import React from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

interface SubHeaderClassStudentProps {
  onSort: (order: 'asc' | 'desc') => void
}

export const SubHeaderClassStudents: React.FC<SubHeaderClassStudentProps> = ({
  onSort
}) => (
  <Flex
    w={'100%'}
    h={'48px'}
    bg={'brand.gray05'}
    pt={'14px'}
    pb={'14px'}
    pl={'24px'}
    pr={'24px'}
  >
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'42.48%'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Nome Completo
      </Text>
      <Flex
        flexDir={'column'}
        ml={'4px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <IconButton
          aria-label="Order by crescent"
          icon={<GoTriangleUp />}
          color="brand.gray60"
          bg={'brand.gray05'}
          _hover={{
            bg: 'brand.withe'
          }}
          w={'10px'}
          h={'10px'}
          onClick={() => onSort('asc')}
        />
        <IconButton
          aria-label="Order by descending"
          icon={<GoTriangleDown />}
          color="brand.gray60"
          _hover={{
            bg: 'brand.withe'
          }}
          bg={'brand.gray05'}
          w={'10px'}
          h={'10px'}
          onClick={() => onSort('desc')}
        />
      </Flex>
    </Flex>
    <Flex w={'28.10%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Telefone
      </Text>
    </Flex>
    <Flex w={'29.41%'} />
  </Flex>
)
