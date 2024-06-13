import { Flex, FormControl, FormLabel, IconButton } from '@chakra-ui/react'
import { SelectMenu, Text } from '../atoms'
import { Input } from './Input'
import InputMask from 'react-input-mask'
import { PiMinusCircleBold, PiPlusCircleBold } from 'react-icons/pi'
import { useState } from 'react'
import React from 'react'

export const ResponsibleDataForm: React.FC = () => {
  const [responsibles, setResponsibles] = useState([
    {
      id: 1,
      name: '',
      RG: '',
      CPF: '',
      NIS: '',
      gender: '',
      ethnicity: '',
      dateOfBirth: '',
      currentJob: '',
      education: '',
      primaryPhone: ''
    }
  ])
  const [nextResponsibleId, setNextResponsibleId] = useState(2)

  const addResponsible = () => {
    setResponsibles([
      ...responsibles,
      {
        id: nextResponsibleId,
        name: '',
        RG: '',
        CPF: '',
        NIS: '',
        gender: '',
        ethnicity: '',
        dateOfBirth: '',
        currentJob: '',
        education: '',
        primaryPhone: ''
      }
    ])
    setNextResponsibleId(nextResponsibleId + 1)
  }

  const removeResponsible = (id: number) => {
    setResponsibles(responsibles.filter((responsible) => responsible.id !== id))
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    setResponsibles(
      responsibles.map((responsible) =>
        responsible.id === id ? { ...responsible, [field]: value } : responsible
      )
    )
  }

  const handleSelectChange = (id: number, field: string, value: string) => {
    setResponsibles(
      responsibles.map((responsible) =>
        responsible.id === id ? { ...responsible, [field]: value } : responsible
      )
    )
  }

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
        <Text.CardTitle>Dados Familiares</Text.CardTitle>
      </Flex>
      {responsibles.map((responsible, index) => (
        <React.Fragment key={responsible.id}>
          <Flex
            w={'100%'}
            h={'17.27%'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <FormControl id={`name-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Nome completo do responsável
              </FormLabel>
              <Input
                type="name"
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.name}
                // error={errors.name}
                placeholder="Nome Completo"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.name}
                onChange={(e) =>
                  handleInputChange(responsible.id, 'name', e.target.value)
                }
              />
            </FormControl>
            <FormControl id={`RG-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                RG do Responsável
              </FormLabel>
              <Input
                type="text"
                name="RG"
                // value={values.RG}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.RG}
                // error={errors.RG}
                placeholder="00.000-000"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.RG}
                onChange={(e) =>
                  handleInputChange(responsible.id, 'RG', e.target.value)
                }
              />
            </FormControl>
            <FormControl id={`CPF-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                CPF do Responsável
              </FormLabel>
              <Input
                type="text"
                name="CPF"
                // value={values.CPF}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.CPF}
                // error={errors.CPF}
                placeholder="000.000.000-00"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.CPF}
                onChange={(e) =>
                  handleInputChange(responsible.id, 'CPF', e.target.value)
                }
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
            <FormControl id={`NIS-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                NIS do Responsável
              </FormLabel>
              <Input
                type="text"
                name="NIS"
                // value={values.NIS}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.NIS}
                // error={errors.NIS}
                placeholder="000.00000.00-0"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.NIS}
                onChange={(e) =>
                  handleInputChange(responsible.id, 'NIS', e.target.value)
                }
              />
            </FormControl>
            <SelectMenu
              label="Gênero do Responsável"
              options={['Masculino', 'Feminino']}
              selectedOption={responsible.gender}
              onSelect={(option) =>
                handleSelectChange(responsible.id, 'gender', option)
              }
            />
            <SelectMenu
              label="Etnia do Responsável"
              options={['Branco', 'Negro', 'Pardo', 'Amarelo', 'Indígena']}
              selectedOption={responsible.ethnicity}
              onSelect={(option) =>
                handleSelectChange(responsible.id, 'ethnicity', option)
              }
            />
          </Flex>
          <Flex
            w={'100%'}
            h={'17.27%'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <FormControl id={`dateOfBirth-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Data de Nascimento do Responsável
              </FormLabel>
              <Input
                type="date"
                // value={values.dateOfBirth}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.dateOfBirth}
                // error={errors.dateOfBirth}
                placeholder="Select Date and Time"
                size="md"
                value={responsible.dateOfBirth}
                onChange={(e) =>
                  handleInputChange(
                    responsible.id,
                    'dateOfBirth',
                    e.target.value
                  )
                }
              />
            </FormControl>
            <FormControl id={`current_job-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Trabalho Atual do Responsável
              </FormLabel>
              <Input
                type="text"
                name="current_job"
                // value={values.current_job}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.current_job}
                // error={errors.current_job}
                placeholder="Trabalho Atual"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.currentJob}
                onChange={(e) =>
                  handleInputChange(
                    responsible.id,
                    'currentJob',
                    e.target.value
                  )
                }
              />
            </FormControl>
            <SelectMenu
              label="Escolaridade do Responsável"
              options={[
                'Não alfabetizada',
                'E.F. COMPLETO',
                'E.F. INCOMPLETO',
                'E.M. COMPLETO',
                'E.M. INCOMPLETO',
                'SUPERIOR'
              ]}
              selectedOption={responsible.education}
              onSelect={(option) =>
                handleSelectChange(responsible.id, 'education', option)
              }
            />
          </Flex>
          <Flex
            w={'100%'}
            h={'17.27%'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={4}
          >
            <FormControl id={`primary-phone-${responsible.id}`} w={['28.87%']}>
              <FormLabel
                fontWeight={'700'}
                ml={'5px'}
                mb={'0px'}
                color={'brand.gray60'}
                fontSize={'14px'}
              >
                Telefone Primário do Responsável
              </FormLabel>
              <Input
                as={InputMask}
                mask="+5\5 (99) 99999-9999"
                maskChar={null}
                type="text"
                name="Phone"
                // value={values.primary-phone}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // touched={touched.primary-phone}
                // error={errors.primary-phone}
                placeholder="(00) 00000-0000"
                mt={'5px'}
                fontSize={'16px'}
                value={responsible.primaryPhone}
                onChange={(e) =>
                  handleInputChange(
                    responsible.id,
                    'primaryPhone',
                    e.target.value
                  )
                }
              />
            </FormControl>
            {index === 0 ? (
              <IconButton
                aria-label="AddResponsible"
                icon={<PiPlusCircleBold />}
                color="brand.primary"
                colorScheme="none"
                w={'48px'}
                h={'48px'}
                size={'lg'}
                borderRadius={'123px'}
                bg={'brand.purple20'}
                alignItems={'center'}
                justifyContent={'center'}
                mt={'24px'}
                onClick={addResponsible}
              />
            ) : (
              <IconButton
                aria-label="RemoveResponsible"
                icon={<PiMinusCircleBold />}
                color="brand.primary"
                colorScheme="none"
                w={'48px'}
                h={'48px'}
                size={'lg'}
                borderRadius={'123px'}
                bg={'brand.purple20'}
                alignItems={'center'}
                justifyContent={'center'}
                onClick={() => removeResponsible(responsible.id)}
                mt={'24px'}
              />
            )}
          </Flex>
        </React.Fragment>
      ))}
    </Flex>
  )
}
