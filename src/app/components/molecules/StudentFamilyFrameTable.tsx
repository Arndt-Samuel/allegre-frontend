import { Flex, Skeleton, Text } from '@chakra-ui/react'
import { HeaderStudentFamilyFrameList } from './HeaderStudentFamilyFrame'
import { SubHeaderStudentFamilyFrameList } from './SubHeaderStudentFamilyFrame'
import { StudentFamilyFrameCard } from './StudentFamilyFrameCard'
import { FooterStudentFamilyFrameCard } from './FooterStudentFamilyFrame'
import { useState, useEffect } from 'react'

interface StudentResponsibleTableProps {
  studentId: string
  relatives: any[]
  onAddFamily: (relative: any) => void
}

export const StudentFamilyFrameTable: React.FC<
  StudentResponsibleTableProps
> = ({ studentId, relatives, onAddFamily }) => {
  const [sortedRelatives, setSortedRelatives] = useState(relatives)
  const [isLoading, setIsLoading] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [perCapitaIncome, setPerCapitaIncome] = useState(0)

  useEffect(() => {
    const parseCurrency = (value: string) => {
      return parseFloat(value.replace(/\./g, '').replace(',', '.'))
    }

    const total = sortedRelatives.reduce((sum, relative) => {
      return (
        sum +
        parseCurrency(relative.wage || '0') +
        parseCurrency(relative.retirement || '0') +
        parseCurrency(relative.allowance || '0') +
        parseCurrency(relative.other_income || '0')
      )
    }, 0)

    setTotalIncome(total)
    setPerCapitaIncome(total / sortedRelatives.length)
  }, [sortedRelatives])

  const handleAddFamily = (relative: any) => {
    setIsLoading(true)
    onAddFamily(relative)
    setTimeout(() => {
      setSortedRelatives((prev) => [...prev, relative])
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
        <HeaderStudentFamilyFrameList
          studentId={studentId}
          onAddFamily={handleAddFamily}
        />
        <SubHeaderStudentFamilyFrameList />
        {isLoading ? (
          <Skeleton height="72px" my="10px" />
        ) : sortedRelatives.length > 0 ? (
          sortedRelatives.map((relative, index) => (
            <StudentFamilyFrameCard key={index} relative={relative} />
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
        <FooterStudentFamilyFrameCard
          totalIncome={totalIncome}
          perCapitaIncome={perCapitaIncome}
        />
      </Flex>
    </Flex>
  )
}
