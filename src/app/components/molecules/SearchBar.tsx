import React from 'react'
import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Flex
      w="30%"
      h="48px"
      borderRadius="123px"
      border={'1px solid'}
      borderColor={'brand.gray30'}
      p={'10px'}
    >
      <InputGroup>
        <InputRightElement h="100%" color={'brand.gray30'}>
          <PiMagnifyingGlassBold />
        </InputRightElement>
        <Input
          borderWidth="0px"
          w="100%"
          h="100%"
          placeholder={placeholder}
          _placeholder={{ color: 'brand.grey50' }}
          focusBorderColor="transparent"
          fontSize={'16px'}
          fontWeight={'500'}
          value={searchTerm}
          onChange={handleChange}
        />
      </InputGroup>
    </Flex>
  )
}
