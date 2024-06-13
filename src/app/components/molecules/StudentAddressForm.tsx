import { Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { Text } from '../atoms'
import React from 'react'
import Input from './Input'
import InputMask from 'react-input-mask'

export const StudentAddressForm: React.FC = () => {
  return (
    <Flex
      w={'84%'}
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
        <Text.CardTitle>Endereço</Text.CardTitle>
      </Flex>
      <Flex
        w={'100%'}
        h={'17.27%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="street" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Rua
          </FormLabel>
          <Input
            type="text"
            // value={values.street}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.street}
            // error={errors.street}
            placeholder="Rua das Exemplo"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="number" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Número
          </FormLabel>
          <Input
            type="number"
            // value={values.number}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.number}
            // error={errors.number}
            placeholder="0000"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="complement" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Complemento
          </FormLabel>
          <Input
            type="text"
            // value={values.complement}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.complement}
            // error={errors.complement}
            placeholder="Complemento"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'17.27%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="neighborhood" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Bairro
          </FormLabel>
          <Input
            type="text"
            // value={values.neighborhood}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.neighborhood}
            // error={errors.neighborhood}
            placeholder="Bairro"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="city" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Cidade
          </FormLabel>
          <Input
            type="text"
            // value={values.city}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.city}
            // error={errors.city}
            placeholder="Cidade"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="state" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Estado
          </FormLabel>
          <Input
            type="text"
            // value={values.state}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.state}
            // error={errors.state}
            placeholder="Estado"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'17.27%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="zip" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            CEP
          </FormLabel>
          <Input
            as={InputMask}
            mask="99-999-999"
            maskChar={null}
            name=""
            // value={values.CEP}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.CEP}
            // error={errors.CEP}
            placeholder="00-000-000"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}
