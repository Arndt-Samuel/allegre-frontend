import { Flex } from '@chakra-ui/react'
import { Text } from '../atoms/Text'
import { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <Flex
    flexDir={'row'}
    w={'100vw'}
    h={'86px'}
    bg={'brand.white'}
    alignItems={'center'}
    justifyContent={'flex-start'}
    p={'32px'}
  >
    <Text>{children}</Text>
  </Flex>
)
