import {
  Text as ChakraText,
  TextProps as ChakraTextProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface TextProps extends ChakraTextProps {
  children: ReactNode
}

export const Text: React.FC<TextProps> = ({ children, ...props }) => (
  <ChakraText
    color="brand.gray80"
    fontWeight="800"
    fontSize={'30px'}
    fontFamily={'--font-plusJakartaSans'}
    {...props}
  >
    {children}
  </ChakraText>
)

export default Text
