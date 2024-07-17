'use client'

import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Flex
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface IconButtonProps extends ChakraIconButtonProps {
  href?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  href,
  ...props
}) => {
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
    <Flex w={'48px'} h={'48px'} alignItems={'center'} justifyContent={'center'}>
      <ChakraIconButton
        icon={icon}
        color={isActive ? 'brand.white' : 'brand.purple20'}
        bg={isActive ? 'brand.purple70' : 'brand.primary'}
        _hover={{ backgroundColor: 'brand.purple50', color: 'brand.white' }}
        _focus={{ backgroundColor: 'brand.purple70', color: 'brand.white' }}
        borderRadius={'123px'}
        size={'lg'}
        onClick={handleClick}
        {...props}
      />
    </Flex>
  )
}

export default IconButton
