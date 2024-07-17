import React from 'react'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from './Input'
import InputMask from 'react-input-mask'
import { SelectMenu, Text } from '../atoms'
import { getAddressByZip } from '@/app/services/addressService'
import { HousingStatus } from '@/app/enums/enums'
import { createStudentAddressCall } from '@/app/api/student'

interface AddressFormValues {
  address_street: string
  address_number: string
  address_complement: string
  address_neighborhood: string
  address_city: string
  address_state: string
  address_zip: string
  housingStatus: HousingStatus
  studentId: string
}

interface AddressFormProps {
  studentId: string
  onSubmit: (values: AddressFormValues) => Promise<void>
  savedData?: AddressFormValues | null
}

export const StudentAddressForm: React.FC<AddressFormProps> = ({
  studentId,
  onSubmit,
  savedData
}) => {
  const toast = useToast()

  const formik = useFormik<AddressFormValues>({
    initialValues: {
      address_street: savedData?.address_street || '',
      address_number: savedData?.address_number || '',
      address_complement: savedData?.address_complement || '',
      address_neighborhood: savedData?.address_neighborhood || '',
      address_city: savedData?.address_city || '',
      address_state: savedData?.address_state || '',
      address_zip: savedData?.address_zip || '',
      housingStatus: savedData?.housingStatus || HousingStatus.Alugado,
      studentId: studentId
    },
    validationSchema: Yup.object({
      address_street: Yup.string().required('Rua é obrigatória'),
      address_number: Yup.string().required('Número é obrigatório'),
      address_complement: Yup.string(),
      address_neighborhood: Yup.string().required('Bairro é obrigatório'),
      address_city: Yup.string().required('Cidade é obrigatória'),
      address_state: Yup.string().required('Estado é obrigatório'),
      address_zip: Yup.string().required('CEP é obrigatório'),
      housingStatus: Yup.mixed<HousingStatus>()
        .oneOf(Object.values(HousingStatus))
        .required('Status de moradia é obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        await createStudentAddressCall(values)
        onSubmit(values)
      } catch (error: any) {
        toast({
          title: 'Erro ao criar endereço',
          description: error.message || 'Ocorreu um erro, tente novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  })

  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue
  } = formik

  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, '')
    setFieldValue('address_zip', zip)
    if (zip.length === 8) {
      try {
        const address = await getAddressByZip(zip)
        setFieldValue('address_street', address.logradouro)
        setFieldValue('address_neighborhood', address.bairro)
        setFieldValue('address_city', address.localidade)
        setFieldValue('address_state', address.uf)
      } catch (error) {
        toast({
          title: 'Erro',
          description:
            'Ocorreu um erro ao buscar o endereço. Tente novamente mais tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      }
    }
  }

  return (
    <form id="form-address" onSubmit={handleSubmit} style={{ width: '84%' }}>
      <Flex
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
          <FormControl id="address_street" w={['28.87%']}>
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
              name="address_street"
              value={values.address_street}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.address_street && !!errors.address_street}
              placeholder="Rua das Exemplo"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="address_number" w={['28.87%']}>
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
              type="text"
              name="address_number"
              value={values.address_number}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.address_number && !!errors.address_number}
              placeholder="0000"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="address_complement" w={['28.87%']}>
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
              name="address_complement"
              value={values.address_complement}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.address_complement && !!errors.address_complement
              }
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
          <FormControl id="address_neighborhood" w={['28.87%']}>
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
              name="address_neighborhood"
              value={values.address_neighborhood}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                touched.address_neighborhood && !!errors.address_neighborhood
              }
              placeholder="Bairro"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="address_city" w={['28.87%']}>
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
              name="address_city"
              value={values.address_city}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.address_city && !!errors.address_city}
              placeholder="Cidade"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl id="address_state" w={['28.87%']}>
            <SelectMenu
              name="address_state"
              value={values.address_state}
              selectedOption={values.address_state}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.address_state && !!errors.address_state}
              label="Estado"
              options={[
                'AC',
                'AL',
                'AM',
                'AP',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MG',
                'MS',
                'MT',
                'PA',
                'PB',
                'PE',
                'PI',
                'PR',
                'RJ',
                'RN',
                'RO',
                'RR',
                'RS',
                'SC',
                'SE',
                'SP',
                'TO'
              ]}
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
          <FormControl id="address_zip" w={['28.87%']}>
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
              mask="99999-999"
              maskChar={null}
              name="address_zip"
              value={values.address_zip}
              onChange={handleZipChange}
              onBlur={handleBlur}
              isInvalid={touched.address_zip && !!errors.address_zip}
              placeholder="00000-000"
              mt={'5px'}
              fontSize={'16px'}
            />
          </FormControl>
          <FormControl w={'28.87%'}>
            <SelectMenu
              name="housingStatus"
              value={values.housingStatus}
              selectedOption={values.housingStatus}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.housingStatus && !!errors.housingStatus}
              label="Status de Moradia"
              options={Object.values(HousingStatus)}
            />
          </FormControl>
          <Flex w={['28.87%']} />
        </Flex>
      </Flex>
    </form>
  )
}
