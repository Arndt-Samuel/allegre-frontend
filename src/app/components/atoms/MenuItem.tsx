import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
  Icon
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MenuItemProps {
  children: ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return (
    <ChakraMenuItem w={'100%'} h={'100%'} fontWeight={500}>
      {children}
    </ChakraMenuItem>
  )
}

export default MenuItem
