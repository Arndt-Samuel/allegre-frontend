'use client'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function ClassesLayout({ children }: { children: ReactNode }) {
  return (
    <Flex w={'100VW'} h={'100vh'}>
      {children}
    </Flex>
  )
}
