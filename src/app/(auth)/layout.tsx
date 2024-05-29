'use client'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex w="100vw" h="100vh">
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={'column'}
        w={'100%'}
        h={'100%'}
      >
        <Box
          position={'absolute'}
          bgImage="linear-gradient(to bottom left, #A5B4FC , transparent 20%), linear-gradient(to top right, #A5B4FC , transparent 20%)"
          w={'100vw'}
          h={'100vh'}
          zIndex={-1}
        />
        {children}
      </Flex>
    </Flex>
  )
}
