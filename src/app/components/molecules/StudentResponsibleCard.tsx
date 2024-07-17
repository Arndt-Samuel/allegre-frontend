import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'

interface StudentResponsibleCardProps {
  responsible: any
}

export const StudentResponsibleCard: React.FC<StudentResponsibleCardProps> = ({
  responsible
}) => (
  <Flex
    flexDir={'row'}
    justifyContent={'flex-start'}
    alignItems={'center'}
    w={'100%'}
    h={'72px'}
    pt={'14px'}
    pb={'14px'}
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
        backgroundImage={responsible.avatarUrl}
        backgroundSize="cover"
      />
      <Text
        color={'brand.gray60'}
        fontSize={'14px'}
        fontWeight={'700'}
        ml={'5px'}
      >
        {responsible.name}
      </Text>
    </Flex>
    <Flex w={'14.20%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {responsible.degree_of_kinship}
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {responsible.primary_phone}
      </Text>
    </Flex>
    <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {responsible.cpf}
      </Text>
    </Flex>
    <Flex w={'33.25%'} alignItems={'center'} justifyContent={'flex-start'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {responsible.rg}
      </Text>
    </Flex>
    <Flex w={'6.79%'} alignItems={'center'} justifyContent={'flex-end'}>
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
