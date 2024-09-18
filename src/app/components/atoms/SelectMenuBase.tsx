import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Option {
  label: string
  value: string
}

interface SelectMenuBaseProps {
  label?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  name: string
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
}

export const SelectMenuBase: React.FC<SelectMenuBaseProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  isInvalid,
  onBlur
}) => {
  const selectedOption = options.find((option) => option.value === value)
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel
        htmlFor={name}
        fontWeight={'700'}
        ml={'5px'}
        mb={'5px'}
        color={'brand.gray60'}
        fontSize={'14px'}
      >
        {label}
      </FormLabel>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon boxSize={5} color={'brand.gray60'} />}
          onBlur={onBlur}
          id={name}
          alignItems={'center'}
          justifyContent={'flex-start'}
          border={'1px solid'}
          borderColor={isInvalid ? 'red' : 'brand.gray30'}
          borderRadius={'123px'}
          bg={'brand.white'}
          fontSize={'16px'}
          fontWeight={'500'}
          color="brand.gray60"
          textAlign="left"
          w="100%"
          h={'48px'}
          _focus={{
            borderColor: 'brand.primary'
          }}
        >
          {selectedOption ? selectedOption.label : `Selecionar ${label}`}
        </MenuButton>
        <MenuList
          w={'100%'}
          border="1px solid"
          borderColor="brand.gray30"
          alignItems={'center'}
          justifyContent={'center'}
          overflowY="auto"
          maxHeight="415px"
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              color={'brand.gray60'}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  )
}
