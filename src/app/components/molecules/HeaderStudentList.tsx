import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button } from '../atoms'
import { Flex, FormControl } from '@chakra-ui/react'
import { SearchBar } from './SearchBar'
import { SelectMenu } from '../atoms'

interface HeaderStudentListProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  classOptions: { label: string; value: string }[]
  setSelectedClass: (classId: string) => void
}

export const HeaderStudentList: React.FC<HeaderStudentListProps> = ({
  searchTerm,
  setSearchTerm,
  classOptions,
  setSelectedClass
}) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      w={'100%'}
      h={'80px'}
      pt={'16px'}
      pb={'16px'}
      pl={'24px'}
      pr={'24px'}
    >
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FormControl w={'30%'}>
        <SelectMenu
          name="class"
          value=""
          onChange={(e) => setSelectedClass(e.target.value)}
          label=""
          options={classOptions}
          selectedOption=""
        />
      </FormControl>
      <Button
        href="/students/create-student"
        w={'25%'}
        h={'48px'}
        color={'brand.white'}
        border={'1px solid'}
        _hover={{
          bg: 'brand.purple50',
          color: 'brand.purple20'
        }}
        fontSize={'16px'}
        fontWeight={700}
        leftIcon={<SmallAddIcon w={'25px'} h={'25px'} />}
      >
        Adicionar Aluno
      </Button>
    </Flex>
  )
}
