import React, { ReactNode } from 'react'
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  NumberInputProps as ChakraNumberInputProps
} from '@chakra-ui/react'

interface NumberInputProps extends ChakraNumberInputProps {
  error?: ReactNode
  touched?: boolean
}

export const NumberInput: React.FC<NumberInputProps> = ({
  error,
  touched,
  ...props
}) => {
  return (
    <>
      <ChakraNumberInput
        borderColor={'brand.gray30'}
        fontSize={'18px'}
        border={'none'}
        focusBorderColor="brand.primary"
        mt={'5px'}
        size={'md'}
        {...props}
      >
        <NumberInputField
          borderColor={'brand.gray30'}
          borderRadius="123px"
          h={'48px'}
        />
        <NumberInputStepper
          h="48px"
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          border={'none'}
        >
          <NumberIncrementStepper border={'none'} />
          <NumberDecrementStepper border={'none'} />
        </NumberInputStepper>
      </ChakraNumberInput>
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}

export default NumberInput
