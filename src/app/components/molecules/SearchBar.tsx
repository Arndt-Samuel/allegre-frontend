import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

export const SearchBar = () => {
  return (
    <Flex
      w="320px"
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
          placeholder="Pesquisar Alunos"
          _placeholder={{ color: 'brand.grey50' }}
          focusBorderColor="transparent"
          fontSize={'16px'}
          fontWeight={'500'}
        />
      </InputGroup>
    </Flex>
  )
}
