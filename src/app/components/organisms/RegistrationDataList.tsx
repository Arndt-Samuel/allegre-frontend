import { Flex } from '@chakra-ui/react'
import {
  RegistrationStudentDataForm,
  WorkshopForm,
  ResponsibleDataForm,
  StudentAddressForm,
  SchoolDataForm,
  StudentStatusForm,
  StudentComplementaryDataForm,
  FooterForm
} from '../molecules'

export const RegistrationDataList: React.FC = () => {
  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
    >
      <RegistrationStudentDataForm />
      <WorkshopForm />
      <ResponsibleDataForm />
      <StudentAddressForm />
      <SchoolDataForm />
      <StudentStatusForm />
      <StudentComplementaryDataForm />
      <FooterForm />
    </Flex>
  )
}
