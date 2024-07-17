import React, { ReactNode, useState } from 'react'
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { MaskToCurrency } from './MaskToCurrency'

interface InputProps extends ChakraInputProps {
  error?: ReactNode
  touched?: boolean
  mask?: string
  maskChar?: string | null
  disabled?: boolean
}

export const Input: React.FC<InputProps> & {
  Password: React.FC<InputProps>
} = ({ maskChar, mask, error, touched, disabled, ...props }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = event.target
    const nextState = { value, selectionStart, selectionEnd }
    const formattedState = MaskToCurrency({ nextState })
    setValue(formattedState.value)
  }

  return (
    <>
      <ChakraInput
        isDisabled={disabled}
        value={value}
        onChange={handleChange}
        mask={mask}
        maskChar={maskChar || ''}
        borderColor={'brand.gray30'}
        borderRadius={'123px'}
        fontSize={'18px'}
        size={'md'}
        h={'48px'}
        focusBorderColor="brand.primary"
        {...props}
      />
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}

const InputPassword: React.FC<InputProps> = ({
  value,
  onChange,
  id,
  name,
  error,
  touched,
  ...props
}) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <InputGroup
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="16px"
        h="56px"
        size="md"
        {...props}
      >
        <ChakraInput
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          borderColor={'brand.gray30'}
          borderRadius={'123px'}
          fontSize={'18px'}
          size={'md'}
          h={'48px'}
          focusBorderColor="brand.primary"
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="*******************"
          fontWeight={'500'}
        />
        <InputRightElement h="100%">
          <Button
            display="flex"
            h="100%"
            size="sm"
            onClick={handleClick}
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            alignItems="center"
            justifyContent="center"
          >
            {show ? (
              <ViewOffIcon boxSize="18px" color="brand.primary" />
            ) : (
              <ViewIcon boxSize="18px" color="brand.gray30" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}

Input.Password = InputPassword
Input.Password.displayName = 'InputPassword'

export default Input
