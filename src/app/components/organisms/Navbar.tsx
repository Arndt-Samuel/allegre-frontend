import { Avatar, Flex, Image } from '@chakra-ui/react'
import {
  PiHouseSimple,
  PiUsersThreeBold,
  PiAddressBookBold,
  PiUsersBold,
  PiGearSixBold
} from 'react-icons/pi'
import IconButton from '../atoms/IconButton'

export const NavBar: React.FC = () => (
  <Flex
    flexDir={'column'}
    justifyContent={'space-between'}
    alignItems={'center'}
    bg="brand.primary"
    w={'80px'}
    h={'100vh'}
    p={'20px'}
  >
    <Flex alignItems={'center'} flexDir={'column'}>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Image
          src="/logo1.svg"
          alt="Casa de Apoio Logo"
          w={'32px'}
          h={'32px'}
          padding={'3px'}
          bg={'brand.white'}
          borderRadius={'12px'}
        />
      </Flex>
      <IconButton mt={'20px'} icon={<PiHouseSimple />} aria-label="home" />
      <IconButton
        mt={'20px'}
        icon={<PiUsersThreeBold />}
        aria-label="Students"
      />
      <IconButton mt={'20px'} icon={<PiAddressBookBold />} aria-label="" />
      <IconButton mt={'20px'} icon={<PiUsersBold />} aria-label="" />
    </Flex>
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <IconButton icon={<PiGearSixBold />} aria-label="" />
      <Avatar w={'48px'} h={'48px'} mt={'20px'} mb={'40px'} />
    </Flex>
  </Flex>
)
