import {
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Box,
  Textarea
} from '@chakra-ui/react'
import { SelectMenu, Text } from '../atoms'
import React, { useState } from 'react'
import Input from './Input'
import { MaskToCurrency } from './MaskToCurrency'

export const StudentStatusForm: React.FC = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = event.target
    const nextState = { value, selectionStart, selectionEnd }
    const formattedState = MaskToCurrency({ nextState })
    setValue(formattedState.value)
  }
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
      <Flex w={'100%'} h={'5.67%'}>
        <Text.CardTitle>Status Beneficiário</Text.CardTitle>
      </Flex>
      <Flex
        w={'100%'}
        h={'13.45%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="family-income" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Renda Familiar
          </FormLabel>
          <InputGroup alignItems={'center'} justifyContent={'center'}>
            <InputLeftAddon
              mr={'0px'}
              borderLeftRadius={'123px'}
              borderRight={'none'}
              h={'48px'}
              bg={'brand.gray05'}
              mt={'5px'}
            >
              R$
            </InputLeftAddon>
            <Input
              borderLeftRadius={'0px'}
              borderLeft={'none'}
              alignItems={'center'}
              justifyContent={'center'}
              value={value}
              onChange={handleChange}
              mask="9999999999"
              maskChar={null}
              placeholder="00.000,00"
              mt={'5px'}
              fontSize={'16px'}

              // value={values.family-income}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // touched={touched.family-income}
              // error={errors.family-income}
            />
          </InputGroup>
        </FormControl>
        <Checkbox
          w={'28.87%'}
          borderColor={'brand.gray30'}
          colorScheme="purple"
          iconColor="brand.white"
          variant={'circular'}
        >
          Recebe Bolsa Família
        </Checkbox>
        <Flex w={['28.87%']} />
      </Flex>
      <Flex
        w={'100%'}
        h={'13.45%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="number-adults" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Número de adultos na composição familiar
          </FormLabel>
          <NumberInput
            borderColor={'brand.gray30'}
            fontSize={'18px'}
            border={'none'}
            focusBorderColor="brand.primary"
            defaultValue={1}
            min={1}
            mt={'5px'}
            size={'md'}
          >
            <NumberInputField
              borderColor={'brand.gray30'}
              borderRadius="123px"
              h={'48px'}
            />
            <NumberInputStepper
              h="48px"
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'none'}
            >
              <NumberIncrementStepper border={'none'} />
              <NumberDecrementStepper border={'none'} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="number-kids" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Número de crianças na composição familiar
          </FormLabel>
          <NumberInput
            borderColor={'brand.gray30'}
            fontSize={'18px'}
            border={'none'}
            focusBorderColor="brand.primary"
            defaultValue={1}
            min={1}
            mt={'5px'}
            size={'md'}
          >
            <NumberInputField
              borderColor={'brand.gray30'}
              borderRadius="123px"
              h={'48px'}
            />
            <NumberInputStepper
              h="48px"
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'none'}
            >
              <NumberIncrementStepper border={'none'} />
              <NumberDecrementStepper border={'none'} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="number-college" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Membros da família com faculdade
          </FormLabel>
          <NumberInput
            borderColor={'brand.gray30'}
            fontSize={'18px'}
            border={'none'}
            focusBorderColor="brand.primary"
            defaultValue={1}
            min={1}
            mt={'5px'}
            size={'md'}
          >
            <NumberInputField
              borderColor={'brand.gray30'}
              borderRadius="123px"
              h={'48px'}
            />
            <NumberInputStepper
              h="48px"
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'none'}
            >
              <NumberIncrementStepper border={'none'} />
              <NumberDecrementStepper border={'none'} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'35.46%'}
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
            Benefícios Recebidos
          </FormLabel>
          <Textarea
            minH={'150px'}
            maxH={'230px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Exemplo: Presentes de Natal, Jogos, etc."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="school-observations" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Equipamentos de informática e digitais
          </FormLabel>
          <Textarea
            minH={'150px'}
            maxH={'230px'}
            borderColor={'brand.gray30'}
            size={'md'}
            focusBorderColor="brand.primary"
            borderRadius="24px"
            // value={values.school-observations}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.school-observations}
            // error={errors.school-observations}
            placeholder="Exemplo: Celular, Computador, Tablet, etc."
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <Flex w={['28.87%']} />
      </Flex>
      <Flex
        w={'100%'}
        h={'13.45%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <SelectMenu
          label="Número da roupa"
          options={[
            '2',
            '4',
            '6',
            '8',
            '10',
            '12',
            'PP',
            'P',
            'M',
            'G',
            'GG',
            'XG',
            'XGG',
            'EG',
            'EGG'
          ]}
        />
        <FormControl id="number-college" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Número do calçado
          </FormLabel>
          <NumberInput
            borderColor={'brand.gray30'}
            fontSize={'18px'}
            border={'none'}
            focusBorderColor="brand.primary"
            defaultValue={1}
            min={1}
            mt={'5px'}
            size={'md'}
          >
            <NumberInputField
              borderColor={'brand.gray30'}
              borderRadius="123px"
              h={'48px'}
            />
            <NumberInputStepper
              h="48px"
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'none'}
            >
              <NumberIncrementStepper border={'none'} />
              <NumberDecrementStepper border={'none'} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="family-income" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Renda Per Capita
          </FormLabel>
          <InputGroup alignItems={'center'} justifyContent={'center'}>
            <InputLeftAddon
              mr={'0px'}
              borderLeftRadius={'123px'}
              borderRight={'none'}
              h={'48px'}
              bg={'brand.gray05'}
              mt={'5px'}
            >
              R$
            </InputLeftAddon>
            <Input
              borderLeftRadius={'0px'}
              borderLeft={'none'}
              alignItems={'center'}
              justifyContent={'center'}
              value={value}
              onChange={handleChange}
              mask="9999999999"
              maskChar={null}
              placeholder="00.000,00"
              mt={'5px'}
              fontSize={'16px'}
              // value={values.family-income}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // touched={touched.family-income}
              // error={errors.family-income}
            />
          </InputGroup>
        </FormControl>
      </Flex>
    </Flex>
  )
}
