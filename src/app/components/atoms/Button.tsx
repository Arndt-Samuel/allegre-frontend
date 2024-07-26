import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { forwardRef, ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, children, ...props }, ref) => {
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
        ref={ref}
        fontWeight={'700'}
        borderRadius={'123px'}
        _hover={{
          bg: 'brand.primary'
        }}
        bg="brand.primary"
        onClick={href ? handleClick : props.onClick}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

export default Button
