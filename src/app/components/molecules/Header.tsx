import { Flex } from '@chakra-ui/react'
import { Text } from '../atoms'
import { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
  iconButton?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children, iconButton }) => (
  <Flex
    flexDir={'row'}
    w={'100vw'}
    h={'86px'}
    bg={'brand.white'}
    alignItems={'center'}
    justifyContent={'flex-start'}
    p={'32px'}
    ml={'80px'}
  >
    {iconButton && <Flex>{iconButton}</Flex>}
    <Text>{children}</Text>
  </Flex>
)
