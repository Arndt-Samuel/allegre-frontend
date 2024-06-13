'use client'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import { Plus_Jakarta_Sans } from 'next/font/google'

const colors = {
  primary: '#4F46E5',
  purple20: '#C7D2FE',
  purple50: '#6366F1',
  black: '#000000',
  white: '#FFFFFF',
  gray05: '#F8FAFC',
  gray10: '#F1F5F9',
  gray20: '#E2E8F0',
  gray30: '#CBD5E1',
  gray40: '#94A3B8',
  grey60: '#475569',
  grey80: '#1E293B',
  background: '#FFFFFF'
}

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusJakartaSans'
})

export const theme = extendTheme({
  colors: {
    brand: colors
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: { sans: 'var(--font-plusJakartaSans)' },
        padding: 0,
        margin: 0,
        width: '100vw',
        scrollX: false,
        overflowX: 'hidden'
      }
    }
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
