import { Flex, IconButton, Text } from '@chakra-ui/react'
import { PiCaretCircleRightBold } from 'react-icons/pi'
import { parseISO, differenceInYears } from 'date-fns'

interface StudentFamilyFrameCardProps {
  relative: any
}

export const StudentFamilyFrameCard: React.FC<StudentFamilyFrameCardProps> = ({
  relative
}) => {
  const calculateAge = (birthdate: string) => {
    const birthDate = parseISO(birthdate)
    return differenceInYears(new Date(), birthDate)
  }

  return (
    <Flex
      flexDir={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      w={'100%'}
      h={'72px'}
      pt={'14px'}
      pb={'14px'}
      pl={'24px'}
      pr={'24px'}
      borderTop={'solid 1px'}
      borderBottom={'solid 1px'}
      borderColor={'brand.gray20'}
    >
      <Flex alignItems={'center'} justifyContent={'flex-start'} w={'20.06%'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {relative.name}
        </Text>
      </Flex>
      <Flex w={'6.79%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {relative.dateOfBirth ? calculateAge(relative.dateOfBirth) : 'N/A'}
        </Text>
      </Flex>
      <Flex w={'9.72%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {relative.degree_of_kinship}
        </Text>
      </Flex>
      <Flex w={'12.42%'} justifyContent={'flex-start'} alignItems={'center'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {relative.marital_status}
        </Text>
      </Flex>
      <Flex w={'8.87%'} alignItems={'center'} justifyContent={'flex-start'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          R${relative.wage}
        </Text>
      </Flex>
      <Flex w={'11.57%'} alignItems={'center'} justifyContent={'flex-start'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          R${relative.retirement}
        </Text>
      </Flex>
      <Flex w={'7.79%'} alignItems={'center'} justifyContent={'flex-start'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          R${relative.allowance}
        </Text>
      </Flex>
      <Flex w={'7.79%'} alignItems={'center'} justifyContent={'flex-start'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          R${relative.other_income}
        </Text>
      </Flex>
      <Flex w={'7.49%'} alignItems={'center'} justifyContent={'flex-start'}>
        <Text color={'brand.gray60'} fontSize={'14px'} fontWeight={'700'}>
          {relative.informal_work ? 'Sim' : 'Não'}
        </Text>
      </Flex>
      <Flex w={'7.49%'} alignItems={'center'} justifyContent={'flex-end'}>
        <IconButton
          aria-label="Edit student arrow"
          icon={<PiCaretCircleRightBold size={24} />}
          color={'brand.gray60'}
          bg={'brand.white'}
          _hover={{
            bg: 'brand.withe'
          }}
        />
      </Flex>
    </Flex>
  )
}
