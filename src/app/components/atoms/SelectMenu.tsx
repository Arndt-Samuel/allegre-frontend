import React, { useState } from 'react'
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

interface SelectMenuProps {
  label: string
  options: string[]
  selectedOption?: string | null
  onSelect?: (option: string) => void
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  options,
  selectedOption,
  onSelect
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [localSelectedOption, setLocalSelectedOption] = useState<string | null>(
    selectedOption || null
  )

  const handleMenuItemClick = (option: string) => {
    if (onSelect) {
      onSelect(option)
    } else {
      setLocalSelectedOption(option)
    }
    setMenuIsOpen(false)
  }

  return (
    <FormControl w={['28.87%']}>
      <FormLabel
        htmlFor="select-menu"
        fontWeight={'700'}
        ml={'5px'}
        mb={'0px'}
        color={'brand.gray60'}
        fontSize={'14px'}
      >
        {label}
      </FormLabel>
      <Menu matchWidth isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)}>
        <MenuButton
          id="select-menu"
          alignItems={'center'}
          justifyContent={'flex-start'}
          border={'1px solid'}
          borderColor={'brand.gray30'}
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
        >
          {selectedOption || localSelectedOption || `Selecionar ${label}`}
        </MenuButton>
        <MenuList
          w={'100%'}
          border="1px solid"
          borderColor="brand.gray30"
          alignItems={'center'}
          justifyContent={'center'}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleMenuItemClick(option)}
              color={'brand.gray60'}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  )
}
