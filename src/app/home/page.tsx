'use client'
import { Flex, Image, FormControl, FormLabel } from '@chakra-ui/react'
import HomeLayout from './layout'
import { ReactElement } from 'react'
import { NavBar } from '../components'

export default function Home(): ReactElement {
  return (
    <HomeLayout>
      <NavBar />
    </HomeLayout>
  )
}
