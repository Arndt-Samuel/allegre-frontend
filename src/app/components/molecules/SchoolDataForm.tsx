import { Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { SelectMenu, Text } from '../atoms'
import React from 'react'
import Input from './Input'
import InputMask from 'react-input-mask'

export const SchoolDataForm: React.FC = () => {
  return (
    <Flex
      w={'84%'}
      h={'380px'}
      flexDir={'column'}
      border={'1px solid'}
      borderRadius={'32px'}
      borderColor={'brand.gray30'}
      p={'24px'}
      justifyContent={'space-between'}
      mt={'16px'}
      gap={'16px'}
    >
      <Flex w={'100%'} h={'7.27%'}>
        <Text.CardTitle>Dados Escolares</Text.CardTitle>
      </Flex>
      <Flex
        w={'100%'}
        h={'auto'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="name" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Nome da Escola
          </FormLabel>
          <Input
            type="text"
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.name}
            // error={errors.name}
            placeholder="Nome da Escola"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <SelectMenu
          label="Gênero do Responsável"
          options={[
            '1 ano EF',
            '2 ano EF',
            '3 ano EF',
            '4 ano EF',
            '5 ano EF',
            '6 ano EF',
            '7 ano EF',
            '8 ano EF',
            '9 ano EF',
            '1 ano EM',
            '2 ano EM',
            '3 ano EM'
          ]}
        />
        <FormControl id="favorite-school-subject" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Matéria de preferência
          </FormLabel>
          <Input
            type="text"
            // value={values.favorite-school-subject}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.favorite-school-subject}
            // error={errors.favorite-school-subject}
            placeholder="Matéria de preferência"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'auto'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="school-observations" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Observações escolares
          </FormLabel>
          <Textarea
            minH={'150px'}
            maxH={'200px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Insira aqui observações escolares da criança."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}
