import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  FormControl,
  FormLabel,
  Box
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Option {
  label: string
  value: string
  isDisabled?: boolean
}

interface MultiSelectMenuProps {
  label?: string
  options: Option[]
  value: string[]
  onChange?: (value: string[]) => void
  name: string
  isInvalid?: boolean
  onBlur?: (event: React.FocusEvent<any>) => void
  isDisabled?: boolean
}

export const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  isInvalid,
  onBlur,
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  )
  const selectedLabels = selectedOptions
    .map((option) => option.label)
    .join(', ')

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <FormControl isInvalid={isInvalid}>
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight="700"
          ml="5px"
          mb="5px"
          color="brand.gray60"
          fontSize="14px"
        >
          {label}
        </FormLabel>
      )}
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnSelect={false}
      >
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon boxSize={5} color="brand.gray60" />}
          onBlur={onBlur}
          id={name}
          onClick={handleMenuButtonClick}
          alignItems="center"
          justifyContent="flex-start"
          border="1px solid"
          borderColor={isInvalid ? 'red' : 'brand.gray30'}
          borderRadius="123px"
          bg="brand.white"
          fontSize="16px"
          fontWeight="500"
          color="brand.gray60"
          textAlign="left"
          w="100%"
          h="48px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          _focus={{
            borderColor: 'brand.primary'
          }}
        >
          <Box
            flex="1"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {selectedLabels || `Selecionar ${label}`}
          </Box>
        </MenuButton>
        <MenuList
          w="100%"
          border="1px solid"
          borderColor="brand.gray30"
          overflowY="auto"
          maxHeight="415px"
          px={2}
        >
          <MenuOptionGroup
            type="checkbox"
            value={value}
            onChange={(selectedValues) => {
              if (!isDisabled && onChange) {
                onChange(selectedValues as string[])
              }
            }}
          >
            {options.map((option) => (
              <MenuItemOption
                key={option.value}
                value={option.value}
                isDisabled={isDisabled || option.isDisabled}
                color="brand.gray60"
                _hover={{ bg: 'brand.gray20' }}
              >
                {option.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </FormControl>
  )
}
