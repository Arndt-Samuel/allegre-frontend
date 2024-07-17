import React, { useState } from 'react'
import { Flex, Text, Skeleton } from '@chakra-ui/react'
import { HeaderStudentResponsibleList } from './HeaderStudentResponsibleList'
import { SubHeaderStudentResponsibleList } from './SubHeaderStudentResponsibleList'
import { StudentResponsibleCard } from './StudentResponsibleCard'

interface StudentResponsibleTableProps {
  studentId: string
  responsibles: any[]
  onAddResponsible: (responsible: any) => void
}

export const StudentResponsibleTable: React.FC<
  StudentResponsibleTableProps
> = ({ studentId, responsibles, onAddResponsible }) => {
  const [sortedResponsibles, setSortedResponsibles] = useState(responsibles)
  const [isLoading, setIsLoading] = useState(false)

  const sortAscending = () => {
    const sorted = [...sortedResponsibles].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    setSortedResponsibles(sorted)
  }

  const sortDescending = () => {
    const sorted = [...sortedResponsibles].sort((a, b) =>
      b.name.localeCompare(a.name)
    )
    setSortedResponsibles(sorted)
  }

  const handleAddResponsible = (responsible: any) => {
    setIsLoading(true)
    onAddResponsible(responsible)
    setTimeout(() => {
      setSortedResponsibles((prev) => [...prev, responsible])
      setIsLoading(false)
    }, 500)
  }

  return (
    <Flex alignItems={'center'} justifyContent={'center'} w={'85%'}>
      <Flex
        w={'100%'}
        h={'auto'}
        flexDir={'column'}
        border={'1px solid'}
        borderRadius={'32px'}
        borderColor={'brand.gray30'}
      >
        <HeaderStudentResponsibleList
          studentId={studentId}
          onAddResponsible={handleAddResponsible}
        />
        <SubHeaderStudentResponsibleList
          onSortAscending={sortAscending}
          onSortDescending={sortDescending}
        />
        {isLoading ? (
          <Skeleton height="72px" my="10px" />
        ) : sortedResponsibles.length > 0 ? (
          sortedResponsibles.map((responsible, index) => (
            <StudentResponsibleCard key={index} responsible={responsible} />
          ))
        ) : (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            h={'100px'}
            borderTop={'solid 1px'}
            borderColor={'brand.gray20'}
          >
            <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
              Nenhum responsável relacionado ao estudante
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
