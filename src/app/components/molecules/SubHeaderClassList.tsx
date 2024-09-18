import React from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

interface SubHeaderClassListProps {
  onSort: (order: 'asc' | 'desc') => void
}

export const SubHeaderClassList: React.FC<SubHeaderClassListProps> = ({
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
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'20.06%'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Nome
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
    <Flex w={'14.20%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Responsável
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Alunos
      </Text>
    </Flex>
    <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Local
      </Text>
    </Flex>
    <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Dias
      </Text>
    </Flex>
    <Flex w={'12.42%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Horário
      </Text>
    </Flex>
    <Flex w={'15.2%'} alignItems={'center'} justifyContent={'flex-end'} />
  </Flex>
)
