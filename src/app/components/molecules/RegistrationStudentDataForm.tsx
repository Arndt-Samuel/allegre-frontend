import {
  Flex,
  Icon,
  Text as ChakraText,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { Text, SelectMenu } from '../atoms'
import { PiFileArrowUpBold } from 'react-icons/pi'
import Input from './Input'
import MaskedInput from './MaskInput'

export const RegistrationStudentDataForm: React.FC = () => {
  return (
    <Flex
      w={'84%'}
      h={'578px'}
      flexDir={'column'}
      border={'1px solid'}
      borderRadius={'32px'}
      borderColor={'brand.gray30'}
      p={'24px'}
      justifyContent={'space-between'}
      gap={'16px'}
    >
      <Flex w={'100%'} h={'5.54%'}>
        <Text.CardTitle>Dados Cadastrais</Text.CardTitle>
      </Flex>
      <Flex flexDir={'column'} h={'36.86%'}>
        <Text
          fontSize={'14px'}
          fontWeight={'700'}
          letterSpacing={'-1px'}
          lineHeight={'20px'}
          mb={'5px'}
          color={'brand.gray60'}
        >
          Foto 3x4
        </Text>
        <Flex
          w={'40%'}
          h={'186px'}
          borderRadius={'32px'}
          border={'1px dotted'}
          borderColor={'brand.gray30'}
          p={'24px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <input style={{ display: 'none' }} type="file" accept="image/*" />
          <Flex
            w={'100%'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            flexDir={'column'}
            cursor={'pointer'}
          >
            <Flex
              w={'64px'}
              h={'64px'}
              borderRadius={'132px'}
              bg={'brand.purple20'}
              color={'brand.primary'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Icon as={PiFileArrowUpBold} w={'32px'} h={'32px'} />
            </Flex>
            <Flex flexDir={'row'} mt={'20px'}>
              <ChakraText
                mr={'3px'}
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'20px'}
                color={'brand.primary'}
              >
                Clique aqui{''}
              </ChakraText>
              <ChakraText
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'20px'}
                color={'brand.gray60'}
              >
                para adicionar o arquivo ou arraste até o campo.
              </ChakraText>
            </Flex>
            <ChakraText
              fontSize={'14px'}
              fontWeight={'500'}
              lineHeight={'20px'}
              color={'brand.gray40'}
            >
              Formatos suportados: PNG, JPG.
            </ChakraText>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w={'100%'}
        h={'13.15%'}
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
            Nome Completo
          </FormLabel>
          <Input
            type="name"
            id="name"
            name="name"
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.name}
            // error={errors.name}
            placeholder="Nome Completo"
            mt={'5px'}
            fontSize={'16px'}
          />
        </FormControl>
        <FormControl id="RG" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            RG
          </FormLabel>
          <MaskedInput
            mask="99.999-999"
            type="RG"
            id="RG"
            name="RG"
            // value={values.RG}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.RG}
            // error={errors.RG}
            placeholder="00.000-000"
            mt={'5px'}
            borderColor={'brand.gray30'}
            borderRadius={'123px'}
            fontSize={'18px'}
            size={'md'}
            h={'48px'}
            focusBorderColor="brand.primary"
            pr="4.5rem"
            fontWeight={'500'}
          />
        </FormControl>
        <FormControl id="CPF" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            CPF
          </FormLabel>
          <MaskedInput
            mask="999.999.999-99"
            type="CPF"
            id="CPF"
            name="CPF"
            // value={values.CPF}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.CPF}
            // error={errors.CPF}
            placeholder="000.000.000-00"
            mt={'5px'}
            borderColor={'brand.gray30'}
            borderRadius={'123px'}
            fontSize={'18px'}
            size={'md'}
            h={'48px'}
            focusBorderColor="brand.primary"
            pr="4.5rem"
            fontWeight={'500'}
          />
        </FormControl>
      </Flex>
      <Flex
        w={'100%'}
        h={'13.15%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="NIS" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            NIS
          </FormLabel>
          <MaskedInput
            mask="999.99999.99-9"
            type="NIS"
            id="NIS"
            name="NIS"
            // value={values.NIS}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.NIS}
            // error={errors.NIS}
            placeholder="000.00000.00-0"
            mt={'5px'}
            borderColor={'brand.gray30'}
            borderRadius={'123px'}
            fontSize={'18px'}
            size={'md'}
            h={'48px'}
            focusBorderColor="brand.primary"
            pr="4.5rem"
            fontWeight={'500'}
          />
        </FormControl>
        <SelectMenu label="Gênero" options={['Masculino', 'Feminino']} />
        <SelectMenu
          label="Etnia"
          options={['Branco', 'Negro', 'Pardo', 'Amarelo', 'Indígena']}
        />
      </Flex>
      <Flex
        w={'100%'}
        h={'13.15%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <FormControl id="dateOfBirth" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Data de Nascimento
          </FormLabel>
          <Input
            // value={values.dateOfBirth}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.dateOfBirth}
            // error={errors.dateOfBirth}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
        </FormControl>

        <FormControl id="primary-phone" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Telefone Primário
          </FormLabel>
          <MaskedInput
            mask="+5\5 (99) 99999-9999"
            type="Phone"
            id="Phone"
            name="Phone"
            // value={values.primary-phone}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.primary-phone}
            // error={errors.primary-phone}
            placeholder="(00) 00000-0000"
            mt={'5px'}
            borderColor={'brand.gray30'}
            borderRadius={'123px'}
            fontSize={'18px'}
            size={'md'}
            h={'48px'}
            focusBorderColor="brand.primary"
            pr="4.5rem"
            fontWeight={'500'}
            _focus={{ outline: 'none' }}
          />
        </FormControl>
        <FormControl id="secondary-phone" w={['28.87%']}>
          <FormLabel
            fontWeight={'700'}
            ml={'5px'}
            mb={'0px'}
            color={'brand.gray60'}
            fontSize={'14px'}
          >
            Telefone Secundário
          </FormLabel>
          <MaskedInput
            mask="+5\5 (99) 99999-9999"
            type="Phone"
            id="Phone"
            name="Phone"
            // value={values.secondary-phone}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // touched={touched.secondary-phone}
            // error={errors.secondary-phone}
            placeholder="(00) 00000-0000"
            mt={'5px'}
            borderColor={'brand.gray30'}
            borderRadius={'123px'}
            fontSize={'18px'}
            size={'md'}
            h={'48px'}
            focusBorderColor="brand.primary"
            pr="4.5rem"
            fontWeight={'500'}
            _focus={{ outline: 'none' }}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}
