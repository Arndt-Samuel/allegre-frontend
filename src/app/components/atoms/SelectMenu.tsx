import React, { ReactNode, useState, useEffect } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  FormControl,
  Text,
  FormLabel
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Option {
  label: string
  value: string
}

interface SelectMenuProps {
  error?: ReactNode
  touched?: boolean
  label: string
  options: Option[] | string[]
  selectedOption?: string | null
  onSelect?: (option: string) => void
  name?: string
  value?: string
  onChange: (event: React.ChangeEvent<any>) => void
  onBlur?: (event: React.FocusEvent<any>) => void
  isInvalid?: boolean
}

const convertToOptions = (options: Option[] | string[]): Option[] => {
  if (typeof options[0] === 'string') {
    return (options as string[]).map((option) => ({
      label: option,
      value: option
    }))
  }
  return options as Option[]
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  options,
  selectedOption,
  error,
  touched,
  onSelect,
  name,
  value,
  onChange,
  onBlur,
  isInvalid
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [localSelectedOption, setLocalSelectedOption] = useState<string | null>(
    selectedOption || null
  )

  useEffect(() => {
    if (selectedOption) {
      setLocalSelectedOption(selectedOption)
    }
  }, [selectedOption])

  const handleMenuItemClick = (option: Option) => {
    if (onSelect) {
      onSelect(option.value)
    } else {
      setLocalSelectedOption(option.label)
    }
    const event = {
      target: {
        name,
        value: option.value
      }
    }
    onChange(event as React.ChangeEvent<any>)
    setMenuIsOpen(false)
  }

  const convertedOptions = convertToOptions(options)

  return (
    <>
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
        <Menu
          matchWidth
          isOpen={menuIsOpen}
          onClose={() => setMenuIsOpen(false)}
        >
          <MenuButton
            id={name}
            alignItems={'center'}
            justifyContent={'flex-start'}
            border={'1px solid'}
            borderColor={isInvalid ? 'red' : 'brand.gray30'}
            borderRadius={'123px'}
            bg={'brand.white'}
            as={Button}
            fontSize={'16px'}
            fontWeight={'500'}
            color="brand.gray60"
            textAlign="left"
            rightIcon={<ChevronDownIcon boxSize={5} color={'brand.gray60'} />}
            w="100%"
            h={'48px'}
            _focus={{
              borderColor: 'brand.primary'
            }}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            onBlur={onBlur}
          >
            {localSelectedOption || `Selecionar ${label}`}
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
            {convertedOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleMenuItemClick(option)}
                color={'brand.gray60'}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormControl>
      {touched && error && <Text color="red">{error}</Text>}
    </>
  )
}
