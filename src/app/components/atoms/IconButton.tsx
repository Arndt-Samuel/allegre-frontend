import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Flex
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface IconButtonProps extends ChakraIconButtonProps {}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <Flex w={'48px'} h={'48px'} alignItems={'center'} justifyContent={'center'}>
      <ChakraIconButton
        icon={icon}
        color={'brand.purple20'}
        bg="brand.primary"
        _hover={{ backgroundColor: 'brand.purple50', color: 'brand.white' }}
        borderRadius={'123px'}
        size={'lg'}
        {...props}
      />
    </Flex>
  )
}

export default IconButton
