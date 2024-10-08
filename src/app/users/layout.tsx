'use client'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <Flex w={'100VW'} h={'100vh'}>
      {children}
    </Flex>
  )
}
