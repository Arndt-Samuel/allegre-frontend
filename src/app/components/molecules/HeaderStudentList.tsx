import { ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Button, MenuItem } from '../atoms'
import {
  MenuButton,
  MenuList,
  Menu,
  Button as ChakraButton,
  Flex
} from '@chakra-ui/react'
import { SearchBar } from './SearchBar'

export const HeaderStudentList: React.FC = () => (
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
    <SearchBar />

    <Menu>
      <MenuButton
        alignItems={'center'}
        justifyContent={'flex-start'}
        w={'320px'}
        h={'48px'}
        border={'1px solid'}
        borderColor={'brand.gray30'}
        borderRadius={'123px'}
        bg={'brand.white'}
        as={ChakraButton}
        fontSize={'16px'}
        fontWeight={'500'}
        color="brand.gray50"
        rightIcon={<ChevronDownIcon boxSize={5} color={'brand.gray60'} />}
      >
        Oficina
      </MenuButton>
      <MenuList
        w={'320px'}
        h={'48px'}
        border={'1px solid'}
        borderColor={'brand.gray30'}
      >
        <MenuItem>Artes</MenuItem>
        <MenuItem>Informatica</MenuItem>
        <MenuItem>Musica</MenuItem>
      </MenuList>
    </Menu>
    <Menu>
      <MenuButton
        alignItems={'center'}
        justifyContent={'flex-start'}
        w={'320px'}
        h={'48px'}
        border={'1px solid'}
        borderColor={'brand.gray30'}
        borderRadius={'123px'}
        bg={'brand.white'}
        as={ChakraButton}
        fontSize={'16px'}
        fontWeight={'500'}
        color="brand.gray50"
        rightIcon={<ChevronDownIcon boxSize={5} color={'brand.gray60'} />}
      >
        Status
      </MenuButton>
      <MenuList
        w={'320px'}
        h={'48px'}
        border={'1px solid'}
        borderColor={'brand.gray30'}
      >
        <MenuItem>Ativo</MenuItem>
        <MenuItem>Inativo</MenuItem>
      </MenuList>
    </Menu>
    <Button
      w={'191px'}
      h={'48px'}
      color={'brand.white'}
      fontSize={'16px'}
      fontWeight={700}
      leftIcon={<SmallAddIcon color={'brand.white'} w={'25px'} h={'25px'} />}
    >
      Adicionar Aluno
    </Button>
  </Flex>
)
