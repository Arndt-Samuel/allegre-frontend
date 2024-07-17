import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
  href?: string
}

export const Button: React.FC<ButtonProps> = ({ href, children, ...props }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (event: React.MouseEvent) => {
    if (href) {
      event.preventDefault()
      router.push(href)
    }
  }

  const isActive = href && pathname === href
  return (
    <ChakraButton
      fontWeight={'700'}
      borderRadius={'123px'}
      _hover={{
        bg: 'brand.primary'
      }}
      bg="brand.primary"
      {...props}
      // onClick={handleClick}
    >
      {children}
    </ChakraButton>
  )
}

export default Button
