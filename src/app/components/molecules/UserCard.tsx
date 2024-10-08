import { Avatar, Flex, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import Tag from '../atoms/Tag'
import IconButtonNav from '../atoms/IconButtonNav'
import { Status, UserRole } from '@/app/enums/enums'
import { statusDisplayMap } from '@/app/utils/statusDisplayMap'
import { userRoleDisplayMap } from '@/app/utils/userRoleDisplayMap'

interface UserCardProps {
  user: {
    id: string
    name: string
    email: string
    primary_phone?: string
    role: UserRole
    classes: {
      classId: string
      className: string
    }[]
    status: Status
    avatarUrl?: string
  }
  onOpen: (UserId: string) => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onOpen }) => {
  const statusColorScheme = user.status === Status.ACTIVE ? 'green' : 'gray'
  return (
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
          src={user.avatarUrl}
          backgroundSize="cover"
        />
        <Text
          color={'brand.gray60'}
          fontSize={'14px'}
          fontWeight={'700'}
          ml={'5px'}
        >
          {user.name}
        </Text>
      </Flex>
      <Flex w={'14.20%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {user.email}
        </Text>
      </Flex>
      <Flex w={'13.27%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {user.primary_phone}
        </Text>
      </Flex>
      <Flex w={'12.46%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {userRoleDisplayMap[user.role]}
        </Text>
      </Flex>
      <Flex w={'16.58%'} alignItems={'center'} justifyContent={'space-between'}>
        {(user.classes || []).map((classes) => (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            key={classes.classId}
            mx={'4px'}
          >
            <Tag colorScheme="blue">{classes?.className}</Tag>
          </Flex>
        ))}
      </Flex>
      <Flex w={'16.58%'} justifyContent={'center'} alignItems={'center'}>
        <Tag colorScheme={statusColorScheme}>
          {statusDisplayMap[user.status]}
        </Tag>
      </Flex>
      <Flex w={'6.79%'} alignItems={'center'} justifyContent={'flex-start'}>
        <IconButtonNav
          aria-label="Editar usuário"
          icon={<PiCaretCircleRightBold size={24} />}
          color={'brand.gray60'}
          bg={'brand.white'}
          _hover={{
            bg: 'brand.withe'
          }}
          onClick={() => onOpen(user.id)}
        />
      </Flex>
    </Flex>
  )
}
