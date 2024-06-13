import { Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { Text } from '../atoms'

export const StudentComplementaryDataForm: React.FC = () => {
  return (
    <Flex
      w={'84%'}
      h={'auto'}
      flexDir={'column'}
      border={'1px solid'}
      borderRadius={'32px'}
      borderColor={'brand.gray30'}
      p={'24px'}
      justifyContent={'space-between'}
      mt={'16px'}
      gap={'16px'}
    >
      <Flex w={'100%'} h={'6.33%'}>
        <Text.CardTitle>Dados Complementares</Text.CardTitle>
      </Flex>
      <Flex
        w={'100%'}
        h={'39.68%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="school-observations" w={['43.55%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            O que mais gosta no projeto?
          </FormLabel>
          <Textarea
            minH={'120px'}
            maxH={'172px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Insira aqui o que a criança mais gosta no projeto."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="school-observations" w={['43.55%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Qual o seu sonho?
          </FormLabel>
          <Textarea
            minH={'120px'}
            maxH={'172px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Insira aqui o sonho da criança."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'13.45%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="school-observations" w={['43.55%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Como está a saúde da criança?
          </FormLabel>
          <Textarea
            minH={'120px'}
            maxH={'172px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Insira o estado de saúde atual da criança."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="school-observations" w={['43.55%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Algum problema de saúde ou alergia?
          </FormLabel>
          <Textarea
            minH={'120px'}
            maxH={'172px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Insira aqui alguma observação sobre a saúde ou alergia da criança."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}
