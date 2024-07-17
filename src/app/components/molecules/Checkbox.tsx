import React, { ReactNode } from 'react'
import {
  Checkbox as ChakraCheckbox,
  Text,
  CheckboxProps as ChakraCheckboxProps
} from '@chakra-ui/react'

interface CheckboxProps extends ChakraCheckboxProps {
  error?: ReactNode
  touched?: boolean
  children: ReactNode
}

export const CheckBox: React.FC<CheckboxProps> = ({
  children,
  error,
  value,
  touched,
  onChange,
  onBlur,
  isInvalid,
  ...props
}) => {
  return (
    <>
      <ChakraCheckbox
        onChange={onChange}
        onBlur={onBlur}
        value={String(value)}
        isInvalid={isInvalid}
        borderColor={'brand.gray30'}
        colorScheme="purple"
        iconColor="brand.white"
        variant={'circular'}
        {...props}
      >
        {children}
      </ChakraCheckbox>
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}

export default CheckBox
