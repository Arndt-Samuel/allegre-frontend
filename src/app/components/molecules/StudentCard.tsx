import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import Tag from '../atoms/Tag'

export const StudentCard: React.FC = () => (
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
    <Flex alignItems={'center'} justifyContent={'center'} w={'20.07%'}>
      <Avatar
        w={'40px'}
        h={'40px'}
        borderRadius={'76px'}
        // backgroundImage={cover_url}
        backgroundSize="cover"
      />
      <Text
        color={'brand.gray60'}
        fontSize={'14px'}
        fontWeight={'700'}
        ml={'5px'}
      >
        Guilherme Santos
      </Text>
    </Flex>
    <Flex w={'14.20%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        Manuela Oliveira
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        31 98378-3901
      </Text>
    </Flex>
    <Flex w={'12.46%'} justifyContent={'center'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        356.568.646-85
      </Text>
    </Flex>
    <Flex w={'16.58%'} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} justifyContent={'center'} mr={'4px'}>
        <Tag colorScheme="blue">Artes</Tag>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Tag colorScheme="orange">Musica</Tag>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'center'} ml={'4px'}>
        <Tag colorScheme="red">Informatica</Tag>
      </Flex>
    </Flex>
    <Flex w={'16.58%'} justifyContent={'center'} alignItems={'center'}>
      <Tag colorScheme="green">Ativo</Tag>
    </Flex>
    <Flex w={'6.79%'} alignItems={'center'} justifyContent={'center'}>
      <IconButton
        aria-label="Edit student arrow"
        icon={<PiCaretCircleRightBold size={24} />}
        color={'brand.gray60'}
        bg={'brand.white'}
        _hover={{
          bg: 'brand.withe'
        }}
      />
    </Flex>
  </Flex>
)
