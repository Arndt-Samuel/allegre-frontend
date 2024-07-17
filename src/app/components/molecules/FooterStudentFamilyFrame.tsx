import { Flex, Text } from '@chakra-ui/react'

interface FooterStudentFamilyFrameCardProps {
  totalIncome: number
  perCapitaIncome: number
}

export const FooterStudentFamilyFrameCard: React.FC<
  FooterStudentFamilyFrameCardProps
> = ({ totalIncome, perCapitaIncome }) => (
  <Flex
    flexDir={'column'}
    justifyContent={'flex-end'}
    alignItems={'center'}
    w={'100%'}
    h={'108px'}
    pt={'16px'}
    pb={'16px'}
    pl={'24px'}
    pr={'24px'}
  >
    <Flex
      alignItems={'center'}
      justifyContent={'flex-end'}
      w={'100%'}
      h={'50%'}
    >
      <Text color={'brand.gray60'} fontSize={'16px'} fontWeight={'500'}>
        Renda Total = R${totalIncome.toFixed(2).replace('.', ',')}
      </Text>
    </Flex>
    <Flex
      w={'100%'}
      h={'50%'}
      justifyContent={'flex-end'}
      alignItems={'center'}
    >
      <Text color={'brand.gray60'} fontSize={'16px'} fontWeight={'500'}>
        Renda Per Capta = R${perCapitaIncome.toFixed(2).replace('.', ',')}
      </Text>
    </Flex>
  </Flex>
)
