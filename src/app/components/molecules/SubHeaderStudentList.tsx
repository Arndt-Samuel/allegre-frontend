import { Flex, IconButton, Text } from '@chakra-ui/react'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

export const SubHeaderStudentList: React.FC = () => (
  <Flex
    w={'100%'}
    h={'48px'}
    bg={'brand.gray05'}
    pt={'14px'}
    pb={'14px'}
    pl={'24px'}
    pr={'24px'}
  >
    <Flex alignItems={'center'} justifyContent={'center'} w={'20.07%'}>
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
        />
      </Flex>
    </Flex>
    <Flex w={'14.20%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Responsável
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Telefone
      </Text>
    </Flex>
    <Flex w={'12.46%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        CPF
      </Text>
    </Flex>
    <Flex w={'16.58%'} alignItems={'center'} justifyContent={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Oficinas Cadastradas
      </Text>
    </Flex>
    <Flex w={'16.58%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Status
      </Text>
    </Flex>
    <Flex w={'6.79%'}></Flex>
  </Flex>
)
