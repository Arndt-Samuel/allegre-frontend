import { Avatar, Flex, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import Tag from '../atoms/Tag'
import IconButtonNav from '../atoms/IconButtonNav'

interface StudentCardProps {
  student: {
    id: string
    name: string
    responsible: string
    primary_phone: string
    cpf: string
    workshops: {
      classId: string
      className: string
    }[]
    status: string
    avatarUrl: string
  }
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => (
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
    <Flex alignItems={'center'} justifyContent={'flex-start'} w={'20.07%'}>
      <Avatar
        w={'40px'}
        h={'40px'}
        borderRadius={'76px'}
        src={student.avatarUrl}
        backgroundSize="cover"
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
    <Flex w={'14.20%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {student.responsible}
      </Text>
    </Flex>
    <Flex w={'13.27%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {student.primary_phone}
      </Text>
    </Flex>
    <Flex w={'12.46%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
        {student.cpf}
      </Text>
    </Flex>
    <Flex w={'16.58%'} alignItems={'center'} justifyContent={'space-between'}>
      {(student.workshops || []).map((workshop) => (
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          key={workshop.classId}
          mx={'4px'}
        >
          <Tag colorScheme="blue">{workshop?.className}</Tag>
        </Flex>
      ))}
    </Flex>
    <Flex w={'16.58%'} />
    <Flex w={'6.79%'} alignItems={'center'} justifyContent={'flex-start'}>
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
