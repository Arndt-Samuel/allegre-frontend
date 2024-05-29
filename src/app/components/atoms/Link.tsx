import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LinkProps extends ChakraLinkProps {
  children: ReactNode
}

export const Link: React.FC<LinkProps> = ({ children, ...props }) => (
  <ChakraLink
    fontSize="18px"
    color="brand.primary"
    fontWeight={'700'}
    {...props}
  >
    {children}
  </ChakraLink>
)
