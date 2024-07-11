import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ChakraButton
      fontWeight={'700'}
      borderRadius={'123px'}
      _hover={{
        bg: 'brand.primary'
      }}
      bg="brand.primary"
      {...props}
    >
      {children}
    </ChakraButton>
  )
}

export default Button
