import React from 'react'
import InputMask from 'react-input-mask'
import { Input, InputProps, Text } from '@chakra-ui/react'

interface MaskedInputProps extends InputProps {
  mask: string
  error?: string
}

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, error, ...props }) => {
  return (
    <>
      <InputMask mask={mask} maskChar="">
        {() => <Input {...props} />}
      </InputMask>
      {error && <Text color="red.500">{error}</Text>}
    </>
  )
}

export default MaskedInput
