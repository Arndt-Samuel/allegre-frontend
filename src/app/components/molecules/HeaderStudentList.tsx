import React from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Button } from '../atoms'
import { Flex, FormControl } from '@chakra-ui/react'
import { SearchBar } from './SearchBar'
import { SelectMenuBase } from '../atoms'

interface HeaderStudentListProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  classOptions: { label: string; value: string }[]
  selectedClass: string
  setSelectedClass: (classId: string) => void
}

export const HeaderStudentList: React.FC<HeaderStudentListProps> = ({
  searchTerm,
  setSearchTerm,
  classOptions,
  selectedClass,
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
      <SearchBar
        placeholder="Pesquisar Alunos"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <FormControl w={'30%'}>
        <SelectMenuBase
          name="class"
          options={classOptions}
          value={selectedClass}
          onChange={setSelectedClass}
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
