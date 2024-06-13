import { Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { Button } from '../atoms'
import { PiXCircleBold, PiCheckCircleBold } from 'react-icons/pi'

export const FooterForm: React.FC = () => {
  return (
    <Flex
      w={'84%'}
      h={'96px'}
      flexDir={'row'}
      p={'24px'}
      justifyContent={'space-between'}
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
          h={'48px'}
          color={'brand.primary'}
          bg={'brand.white'}
          _hover={{
            bg: 'red',
            color: 'brand.white',
            borderColor: 'red'
          }}
          border={'1px solid'}
          borderColor={'brand.primary'}
          fontSize={'18px'}
          fontWeight={700}
          leftIcon={<PiXCircleBold size={20} />}
        >
          Cancelar
        </Button>
        <Button
          w={'14.76%'}
          h={'48px'}
          border={'1px solid'}
          _hover={{
            bg: 'brand.purple50',
            color: 'brand.purple20'
          }}
          fontSize={'18px'}
          fontWeight={700}
          color={'brand.white'}
          leftIcon={<PiCheckCircleBold size={20} />}
        >
          Salvar dados
        </Button>
      </Flex>
    </Flex>
  )
}
