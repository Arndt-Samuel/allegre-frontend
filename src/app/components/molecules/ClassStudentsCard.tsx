import { Avatar, Flex, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import IconButtonNav from '../atoms/IconButtonNav'

interface StudentCardProps {
  student: {
    id: string
    name: string
    primary_phone: string
    avatarUrl: string
  }
}

export const ClassStudentsCard: React.FC<StudentCardProps> = ({ student }) => (
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
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'42.48%'}>
      <Avatar
        w={'40px'}
        h={'40px'}
        borderRadius={'76px'}
        backgroundSize="cover"
        src={student.avatarUrl}
      />
      <Text
        color={'brand.gray60'}
        fontSize={'14px'}
        fontWeight={'700'}
        ml={'5px'}
      >
        {student.name}
      </Text>
    </Flex>
    <Flex w={'28.10%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {student.primary_phone}
      </Text>
    </Flex>
    <Flex w={'29.41%'} alignItems={'center'} justifyContent={'flex-end'}>
      <IconButtonNav
        aria-label="Edit student arrow"
        icon={<PiCaretCircleRightBold size={24} />}
        color={'brand.gray60'}
        bg={'brand.white'}
        _hover={{
          bg: 'brand.withe'
        }}
        href={`/students/update/${student.id}`}
      />
    </Flex>
  </Flex>
)
