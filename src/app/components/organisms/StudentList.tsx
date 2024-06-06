import { Flex } from '@chakra-ui/react'
import {
  HeaderStudentList,
  StudentCard,
  SubHeaderStudentList
} from '../molecules'

export const StudentList: React.FC = () => (
  <Flex alignItems={'center'} justifyContent={'center'}>
    <Flex
      w={'84%'}
      h={'848px'}
      flexDir={'column'}
      border={'1px solid'}
      borderRadius={'32px'}
      borderColor={'brand.gray30'}
    >
      <HeaderStudentList />
      <SubHeaderStudentList />
      <StudentCard />
    </Flex>
  </Flex>
)
