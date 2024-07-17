import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const generatePageArray = () => {
    const pages = []
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        )
      }
    }
    return pages
  }

  const pages = generatePageArray()

  return (
    <Flex alignItems="center" justifyContent="center" mt={4}>
      {currentPage !== 1 && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          bg={'brand.white'}
          leftIcon={<ChevronLeftIcon boxSize={5} color={'brand.gray60'} />}
        >
          Anterior
        </Button>
      )}
      {pages.map((page, index) => (
        <Button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          isActive={page === currentPage}
          bg={'brand.white'}
          disabled={typeof page !== 'number'}
        >
          {page}
        </Button>
      ))}
      {currentPage !== totalPages && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          bg={'brand.white'}
          rightIcon={<ChevronRightIcon boxSize={5} color={'brand.gray60'} />}
        >
          Próxima
        </Button>
      )}
    </Flex>
  )
}
