'use client'

import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Flex
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface IconButtonProps extends ChakraIconButtonProps {
  href?: string
}

export const IconButtonNav: React.FC<IconButtonProps> = ({
  icon,
  href,
  ...props
}) => {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent) => {
    if (href) {
      event.preventDefault()
      router.push(href)
    }
  }

  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <ChakraIconButton icon={icon} onClick={handleClick} {...props} />
    </Flex>
  )
}

export default IconButtonNav
