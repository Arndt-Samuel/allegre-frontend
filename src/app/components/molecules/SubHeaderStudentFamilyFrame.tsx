import { Flex, Text } from '@chakra-ui/react'

export const SubHeaderStudentFamilyFrameList: React.FC = () => (
  <Flex
    w={'100%'}
    h={'48px'}
    bg={'brand.gray05'}
    pt={'14px'}
    pb={'14px'}
    pl={'24px'}
    pr={'24px'}
    justifyContent={'flex-start'}
    alignItems={'center'}
  >
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'20.06%'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Nome Completo
      </Text>
    </Flex>
    <Flex w={'6.79%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Idade
      </Text>
    </Flex>
    <Flex w={'9.72%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Parentesco
      </Text>
    </Flex>
    <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Estado Civil
      </Text>
    </Flex>
    <Flex w={'8.87%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Salário
      </Text>
    </Flex>
    <Flex w={'11.57%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Aposentadoria
      </Text>
    </Flex>
    <Flex w={'7.79%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Pensão
      </Text>
    </Flex>
    <Flex w={'7.79%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Outros
      </Text>
    </Flex>
    <Flex w={'7.49%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'800'}>
        Informal
      </Text>
    </Flex>
    <Flex w={'7.49%'}></Flex>
  </Flex>
)
