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
    <ChakraMenuItem w={'320px'} h={'48px'} fontWeight={500}>
      {children}
    </ChakraMenuItem>
  )
}

export default MenuItem
