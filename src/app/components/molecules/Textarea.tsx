import React, { ReactNode, useState } from 'react'
import {
  Textarea as ChakraTextarea,
  Text,
  TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react'

interface TextareaProps extends ChakraTextareaProps {
  error?: ReactNode
  touched?: boolean
  disabled?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({
  error,
  touched,
  disabled,
  ...props
}) => {
  return (
    <>
      <ChakraTextarea
        borderColor={'brand.gray30'}
        size={'md'}
        focusBorderColor="brand.primary"
        borderRadius="24px"
        isDisabled={disabled}
        {...props}
      />
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}

export default Textarea
