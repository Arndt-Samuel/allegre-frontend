'use client'
import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { NavBar } from '../components'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <Flex>{children}</Flex>
}
