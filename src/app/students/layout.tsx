'use client'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return (
    <Flex w={'100VW'} h={'100vh'}>
      {children}
    </Flex>
  )
}
