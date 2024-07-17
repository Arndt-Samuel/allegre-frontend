import { Flex, Button } from '@chakra-ui/react'
import { PiArrowArcRightBold, PiCheckCircleBold } from 'react-icons/pi'

interface FooterFormProps {
  onSubmitAll: () => void
  onNext: () => void
}

export const FooterForm: React.FC<FooterFormProps> = ({
  onSubmitAll,
  onNext
}) => {
  return (
    <Flex
      w={'84%'}
      h={'206px'}
      flexDir={'row'}
      p={'24px'}
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      mt={'16px'}
      gap={'24px'}
    >
      <Flex
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        gap={'16px'}
      >
        <Button
          w={'12.18%'}
          h={'56px'}
          color={'brand.primary'}
          bg={'brand.white'}
          _hover={{
            bg: 'brand.purple50',
            color: 'brand.white'
          }}
          border={'1px solid'}
          borderRadius={'1234px'}
          borderColor={'brand.primary'}
          fontSize={'18px'}
          fontWeight={700}
          rightIcon={<PiArrowArcRightBold size={20} />}
          onClick={() => {
            onNext()
          }}
        >
          Pular
        </Button>
        <Button
          w={'14.76%'}
          h={'56px'}
          border={'1px solid'}
          borderRadius={'1234px'}
          bg={'brand.primary'}
          _hover={{
            bg: 'brand.purple50',
            color: 'brand.purple20'
          }}
          fontSize={'18px'}
          fontWeight={700}
          color={'brand.white'}
          leftIcon={<PiCheckCircleBold size={20} />}
          onClick={() => {
            onSubmitAll()
          }}
        >
          Salvar e Avançar
        </Button>
      </Flex>
    </Flex>
  )
}
